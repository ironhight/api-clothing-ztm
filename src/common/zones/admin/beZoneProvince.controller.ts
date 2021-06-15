import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Permissions } from "@core/services/permission.service";
import { UserSecure } from "@common/auth/user/decorators/user-secure.decorator";
import { ACL } from '@common/auth/decorators/acl.decorator';
import { ResponseService } from '@core/services/response.service';
import { ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { ZoneProvinceService } from '../services/zoneProvince.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';
import { BeZoneProvinceDto } from './dto/beZoneProvince.dto';

@ApiTags('Admin/ZoneProvince')
@Controller('admin/zone-provinces')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class BeZoneProvinceController {
    constructor(
        private zoneProvince: ZoneProvinceService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    @ACL(Permissions.zone_province_list)
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneProvince.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneProvinceList(items, {}, false));
    }

    @Get(':id')
    @ACL(Permissions.zone_province_detail)
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneProvince.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneProvinceDetail(item));
    }

    @Post()
    @ACL(Permissions.zone_province_add)
    async add(@Body() dto: BeZoneProvinceDto): Promise<any> {
        let item = await this.zoneProvince.create(dto);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformZoneProvinceDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.zone_province_edit)
    async edit(@Param('id') id: number, @Body() dto: BeZoneProvinceDto): Promise<any> {
        let item = await this.zoneProvince.update(id, dto);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformZoneProvinceDetail(item));
    }

    @Delete()
    @ACL(Permissions.zone_province_delete)
    async deletes(@Query('ids') ids: Array<number>): Promise<any> {
        let items = await this.zoneProvince.deleteManyById(ids);
        if (!items) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
