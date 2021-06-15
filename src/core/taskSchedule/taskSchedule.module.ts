import { Module } from '@nestjs/common';
import { TaskScheduleService } from '@core/taskSchedule/services/taskSchedule.service';
import { MessageScheduleService } from '@core/taskSchedule/services/messageSchedule.service';
import { BlacklistScheduleService } from '@core/taskSchedule/services/blacklistSchedule.service';
import { LogScheduleService } from '@core/taskSchedule/services/logSchedule.service';
import { BlacklistModule } from '@common/auth/blacklist/blacklist.module';
import { LogModule } from '@common/log/log.module';
import { QueueModule } from '@common/queues/queue.module';
@Module({
    imports: [BlacklistModule, LogModule, QueueModule],
    providers: [TaskScheduleService, BlacklistScheduleService, LogScheduleService, MessageScheduleService],
})
export class TaskScheduleModule {
}
