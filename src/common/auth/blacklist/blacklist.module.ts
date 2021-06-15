import { Module } from '@nestjs/common';
import { EntityModule } from '@entities/entity.module';
import { BlacklistService } from "@common/auth/blacklist/services/blacklist.service";
import { BlacklistCronService } from '@common/auth/blacklist/services/blacklistCron.service';

@Module({
    imports: [EntityModule],
    providers: [BlacklistService, BlacklistCronService],
    controllers: [],
    exports: [BlacklistService, BlacklistCronService]
})
export class BlacklistModule {
}
