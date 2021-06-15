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
import { ZoneProvinceService } from '../services/zoneProvince.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';

@ApiTags('Frontend/ZoneProvince')
@Controller('zone-provinces')
@UseInterceptors(CoreTransformInterceptor)
export class FeZoneProvinceController {
    constructor(
        private zoneProvince: ZoneProvinceService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneProvince.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneProvinceList(items, {}, true));
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneProvince.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneProvinceDetail(item, {}, true));
    }
}
