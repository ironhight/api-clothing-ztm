import { Module } from '@nestjs/common';
import { SchedulerProducerService } from './services/scheduler.producer.service';
import { SchedulerConsumerService } from './services/scheduler.consumer.service';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { EntityModule } from '@entities/entity.module';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [
        EntityModule,
        EmailModule,
        BullModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get('redis.host'),
                    port: configService.get('redis.port'),
                    password: configService.get('redis.password'),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({ name: 'scheduler' }),
    ],
    controllers: [],
    providers: [SchedulerProducerService, SchedulerConsumerService],
    exports: [SchedulerProducerService],
})
export class QueueModule {}
