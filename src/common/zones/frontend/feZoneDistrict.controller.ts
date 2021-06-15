import {
    Controller,
    Get,
    Param,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseService } from '@core/services/response.service';
import { ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { ZoneDistrictService } from '../services/zoneDistrict.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';

@ApiTags('Frontend/ZoneDistrict')
@Controller('zone-districts')
@UseInterceptors(CoreTransformInterceptor)
export class FeZoneDistrictController {
    constructor(
        private zoneDistrict: ZoneDistrictService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneDistrict.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneDistrictList(items, {}, true));
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneDistrict.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneDistrictDetail(item, {}, true));
    }
}
