import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { UserGuard } from '@src/common/auth/user/guards/user.guard';
import { ApiTags } from '@nestjs/swagger';
import { ACL } from '@common/auth/decorators/acl.decorator';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { BeCustomerDto } from '@src/common/customers/admin/dto/beCustomer.dto';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import { Permissions } from '@core/services/permission.service';
import { ResponseService } from '@core/services/response.service';
import { TransformerCustomerService } from '../services/transformerCustomer.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '@entities/customer.entity';
@ApiTags('Admin/Customer')
@Controller('admin/customers')
@UseGuards(UserGuard)
@UseInterceptors(CoreTransformInterceptor)
export class BeCustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly transformer: TransformerCustomerService,
        private readonly response: ResponseService,

        @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    ) {}

    @Get()
    @ACL(Permissions.customer_list)
    @DefaultListQuery()
    async findAll(@Query() query: Record<string, any>): Promise<CoreResponse> {
        let items = await this.customerService.findAll(query);
        if(query.get && query.export) return this.transformer.transformCustomerExport(items);
        return this.response.fetchListSuccess(this.transformer.transformCustomerList(items));
    }

    @Get(':id')
    @ACL(Permissions.customer_detail)
    async detail(@Param('id') id: number): Promise<CoreResponse> {
        let item = await this.customerService.detail(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformCustomerDetail(item));
    }

    @Post('/')
    @ACL(Permissions.customer_add)
    @HasFile()
    async create(
        @UploadedFiles() files: Record<any, any>,
        @Body() dto: BeCustomerDto,
    ): Promise<CoreResponse> {
        let item = await this.customerService.create(dto, files);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformCustomerDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.customer_edit)
    @HasFile()
    async update(
        @UploadedFiles() files: Record<any, any>,
        @Param('id') id: number,
        @Body() dto: BeCustomerDto,
    ): Promise<CoreResponse> {
        let item = await this.customerService.update(id, dto, files);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformCustomerDetail(item));
    }

    @Delete()
    @ACL(Permissions.customer_delete)
    async delete(@Body('ids') ids: number[]): Promise<CoreResponse> {
        let item = await this.customerRepo.softDelete(ids);
        if (!item) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
