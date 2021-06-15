import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { HelperService } from '@core/services/helper.service';

@ApiTags('Admin/Permission')
@Controller('admin/permissions')
@UseInterceptors(CoreTransformInterceptor)
export class PermissionsController {
    constructor(private helperService: HelperService) {}

    @Get()
    async permissions(): Promise<CoreResponse> {
        return {
            status: true,
            data: this.helperService.allPermissions(),
        };
    }
}
