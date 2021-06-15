import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerProducerService } from '@common/queues/services/scheduler.producer.service';

@Injectable()
export class MessageScheduleService {
    constructor(
        private schedulerProducerService: SchedulerProducerService
    ) {}

    /**
     * Schedule: Every 15 minutes on first second, at the start of the first minute
     * Description: sendMessage
     */
    @Cron('0 */15 * * * *', {
        name: 'sendMessage',
    })
    async handleSendMessageCron() {
        console.log('Task Schedule: sendMessage');
        await this.schedulerProducerService.sendMsg();
    }

    /**
     * Schedule: Every year on first second, at the start of the first minute
     * Description: moveFileObjects
     */
    @Cron(CronExpression.EVERY_YEAR, {
        name: 'moveFileObjects',
    })
    async handleMoveFileObjectsCron() {
        console.log('Task Schedule: moveFileObjects');
        await this.schedulerProducerService.sendMsg();
    }
}
