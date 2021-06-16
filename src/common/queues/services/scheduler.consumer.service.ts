import { Job } from 'bull';
import { Processor, Process, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';

@Processor('scheduler')
export class SchedulerConsumerService {
    constructor(
    ) {}

    @Process('sendMsg')
    async sendMsg(job: Job<unknown>): Promise<any> {
    console.log("🚀 ~ file: scheduler.consumer.service.ts ~ line 11 ~ SchedulerConsumerService ~ sendMsg ~ job", job.data)
       

        job.progress(1);
    }

    @OnQueueCompleted()
    async onCompleted(job: Job, result: any): Promise<any> {
        console.log('Process is completed!');
    }

    @OnQueueFailed()
    async onFailed(job: Job, err: Error): Promise<any> {
        console.log('Process is failed!');
    }
}
