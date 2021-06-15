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
import { ZoneWardService } from '../services/zoneWard.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';

@ApiTags('Frontend/ZoneWard')
@Controller('zone-wards')
@UseInterceptors(CoreTransformInterceptor)
export class FeZoneWardController {
    constructor(
        private zoneWard: ZoneWardService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Get()
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.zoneWard.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformZoneWardList(items, {}, true));
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<any> {
        let item = await this.zoneWard.findById(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformZoneWardDetail(item, {}, true));
    }
}
