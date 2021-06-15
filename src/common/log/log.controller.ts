import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { UserSecure } from '@common/auth/user/decorators/user-secure.decorator';
import { ACL } from '@common/auth/decorators/acl.decorator';
import { Permissions } from '@core/services/permission.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import * as moment from 'moment';
import { LogService } from '@common/log/services/log.service';

@ApiTags('Logging')
@Controller('logging')
@UserSecure()
export class LogController {
    constructor(
        private readonly logService: LogService,
    ) {}
}
