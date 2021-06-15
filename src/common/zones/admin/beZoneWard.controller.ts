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
import { ZoneWardService } from '../services/zoneWard.service';
import { ZoneDistrictService } from '../services/zoneDistrict.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';
import { BeZoneWardDto } from './dto/beZoneWard.dto';

@ApiTags('Admin/ZoneWard')
@Controller('admin/zone-wards')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class BeZoneWardController {
    constructor(
        private zoneWard: ZoneWardService,
        private zoneDistrict: ZoneDistrictService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    @ACL(Permissions.zone_ward_list)
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneWard.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneWardList(items));
    }

    @Get(':id')
    @ACL(Permissions.zone_ward_detail)
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneWard.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneWardDetail(item));
    }

    @Post()
    @ACL(Permissions.zone_ward_add)
    async add(@Body() dto: BeZoneWardDto): Promise<any> {
        let district = await this.zoneDistrict.findById(dto.zoneDistrict);
        if (!district) return this.response.detailFail('District not found');
        //
        let item = await this.zoneWard.create(dto);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformZoneWardDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.zone_ward_edit)
    async edit(@Param('id') id: number, @Body() dto: BeZoneWardDto): Promise<any> {
        let district = await this.zoneDistrict.findById(dto.zoneDistrict);
        if (!district) return this.response.detailFail('District not found');
        //
        let item = await this.zoneWard.update(id, dto);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformZoneWardDetail(item));
    }

    @Delete()
    @ACL(Permissions.zone_ward_delete)
    async deletes(@Query('ids') ids: Array<number>): Promise<any> {
        let items = await this.zoneWard.deleteManyById(ids);
        if (!items) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
