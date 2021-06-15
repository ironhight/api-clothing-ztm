import { Module } from '@nestjs/common';
import { TaskScheduleModule } from '@core/taskSchedule/taskSchedule.module';
import { CoresModule } from '@core/cores.module';
import { AuthModule } from '@common/auth/auth.module';
import { UserModule } from '@common/users/user.module';
import { RolesModule } from '@common/roles/roles.module';
import { CustomerModule } from '@common/customers/customer.module';
import { EntityModule } from '@src/entities/entity.module';
import { EmailModule } from '@common/email/email.module';
import { AppController } from '@src/app.controller';
import { ZoneModule } from '@common/zones/zone.module';

@Module({
    imports: [
        EntityModule,
        TaskScheduleModule,
        CoresModule,
        ZoneModule,
        AuthModule,
        UserModule,
        RolesModule,
        CustomerModule,
        EmailModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
