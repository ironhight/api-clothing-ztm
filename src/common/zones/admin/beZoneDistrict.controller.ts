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
import { ZoneDistrictService } from '../services/zoneDistrict.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';
import { BeZoneDistrictDto } from './dto/beZoneDistrict.dto';

@ApiTags('Admin/ZoneDistrict')
@Controller('admin/zone-districts')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class BeZoneDistrictController {
    constructor(
        private zoneProvince: ZoneProvinceService,
        private zoneDistrict: ZoneDistrictService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    @ACL(Permissions.zone_district_list)
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneDistrict.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneDistrictList(items));
    }

    @Get(':id')
    @ACL(Permissions.zone_district_detail)
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneDistrict.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneDistrictDetail(item));
    }

    @Post()
    @ACL(Permissions.zone_district_add)
    async add(@Body() dto: BeZoneDistrictDto): Promise<any> {
        let province = await this.zoneProvince.findById(dto.zoneProvince);
        if (!province) return this.response.detailFail('Province not found');
        //
        let item = await this.zoneDistrict.create(dto);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformZoneDistrictDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.zone_district_edit)
    async edit(@Param('id') id: number, @Body() dto: BeZoneDistrictDto): Promise<any> {
        let province = await this.zoneProvince.findById(dto.zoneProvince);
        if (!province) return this.response.detailFail('Province not found');
        //
        let item = await this.zoneDistrict.update(id, dto);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformZoneDistrictDetail(item));
    }

    @Delete()
    @ACL(Permissions.zone_district_delete)
    async deletes(@Query('ids') ids: Array<number>): Promise<any> {
        let items = await this.zoneDistrict.deleteManyById(ids);
        if (!items) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
