import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperService } from '@core/services/helper.service';
import { ZoneProvince } from './zones/zoneProvince.entity';
import { ZoneProvinceTrans } from './zones/zoneProvinceTrans.entity ';
import { ZoneDistrict } from './zones/zoneDistrict.entity';
import { ZoneDistrictTrans } from './zones/zoneDistrictTrans.entity';
import { ZoneWard } from './zones/zoneWard.entity';
import { ZoneWardTrans } from './zones/zoneWardTrans.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
import { Customer } from './customer.entity';
import { TokenBlacklist } from './tokenBlacklist.entity';
import { Log } from './log.entity';

const entities = [
    ZoneProvince,
    ZoneProvinceTrans,
    ZoneDistrict,
    ZoneDistrictTrans,
    ZoneWard,
    ZoneWardTrans,
    Role,
    User,
    Customer,
    TokenBlacklist,
    Log,
];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [HelperService],
            useFactory: async (helperService: HelperService) => {
                const connectDatabase = await helperService.connectDatabase();
                return {
                    ...connectDatabase,
                    entities: entities,
                };
            },
            inject: [HelperService],
        }),
        TypeOrmModule.forFeature(entities),
    ],
    exports: [TypeOrmModule],
})
export class EntityModule {}
