import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as  moment from 'moment';

@Injectable()
export class SchedulerProducerService {
    constructor(
        @InjectQueue('scheduler') private schedulerQueue: Queue
    ) {}

    async sendMsg(): Promise<any> {
        const start = moment()
        const remainder = start.minute() % 15;
        const dateTime = start.subtract(remainder, 'minutes').format('YYYY-MM-DD-HH:mm')
        const job = await this.schedulerQueue.add('sendMsg', {
            foo: 'bar',
        }, {
            priority: 1,
            delay: 10000,
            attempts: 3,
            jobId: `sendMsg-${dateTime}`,
            removeOnComplete: true,
        });
    }
}
