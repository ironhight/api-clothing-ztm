import { Module } from '@nestjs/common';
import { LogService } from '@common/log/services/log.service';
import { LogCronService } from '@src/common/log/services/logCron.service';
import { LogController } from '@common/log/log.controller';
import { EntityModule } from '@entities/entity.module';
@Module({
    imports: [EntityModule],
    controllers: [LogController],
    providers: [LogService, LogCronService],
    exports: [LogService, LogCronService],
})
export class LogModule {
}
