import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LogCronService } from '@src/common/log/services/logCron.service';

@Injectable()
export class LogScheduleService {
    constructor(
        private cronJobService: LogCronService
    ) {}

    /**
     * Schedule: Every 2 hours on first second, at the start of the first minute
     * Description: Delete expire log table
     */
    @Cron(CronExpression.EVERY_2ND_HOUR, {
        name: 'deleteDeleteExpireLog',
    })
    async handleDeleteExpireLogCron() {
        console.log('Task Schedule: deleteDeleteExpireLog');
        await this.cronJobService.deleteDeleteExpireLog();
    }
}
