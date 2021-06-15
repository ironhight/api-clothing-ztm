import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BlacklistCronService } from '@common/auth/blacklist/services/blacklistCron.service';

@Injectable()
export class BlacklistScheduleService {
    constructor(
        private cronJobService: BlacklistCronService
    ) {}

    /**
     * Schedule: Every 2 hours on first second, at the start of the first minute
     * Description: Delete expire token in blacklist table
     */
    @Cron(CronExpression.EVERY_2ND_HOUR, {
        name: 'deleteDeleteExpireToken',
    })
    async handleDeleteExpireTokenCron() {
        console.log('Task Schedule: deleteDeleteExpireToken');
        await this.cronJobService.deleteExpireToken();
    }
}
