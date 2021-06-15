import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserSecure } from '@src/common/auth/user/decorators/user-secure.decorator';
import { UserDto } from '@src/common/users/admin/dto/user.dto';
import { ACL } from '@common/auth/decorators/acl.decorator';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { Permissions } from '@core/services/permission.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import { TransformerUserService } from '../services/transformerUser.service';
import { ResponseService } from '@core/services/response.service';
@ApiTags('Admin/User')
@Controller('admin/users')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly transformer: TransformerUserService,
        private readonly response: ResponseService
    ) {}

    @Get('/')
    @ACL(Permissions.user_list)
    @DefaultListQuery()
    async findAll(@Query() query: Record<string, any>): Promise<CoreResponse> {
        let items = await this.userService.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformUserList(items));
    }

    @Get(':id')
    @ACL(Permissions.user_detail)
    async detail(@Param('id') id: number): Promise<CoreResponse> {
        let item = await this.userService.detail(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformUserDetail(item));
    }

    @Post('/')
    @ACL(Permissions.user_add)
    @HasFile()
    async create(@UploadedFiles() files: Record<any, any>, @Body() dto: UserDto): Promise<CoreResponse> {
        let item = await this.userService.create(dto, files);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformUserDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.user_edit)
    @HasFile()
    async update(@UploadedFiles() files: Record<any, any>, @Param('id') id: number, @Body() dto: UserDto): Promise<CoreResponse> {
        let item = await this.userService.update(id, dto, files);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformUserDetail(item));
    }

    @Delete(':id')
    @ACL(Permissions.user_delete)
    async delete(@Param('id') id: number): Promise<CoreResponse> {
        let item = await this.userService.delete(id);
        if (!item) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
