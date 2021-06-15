import { Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneDistrict } from './zoneDistrict.entity';
import { ZoneProvinceTrans } from './zoneProvinceTrans.entity ';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({name: 'zone_provinces'})
@Unique(['code'])
export class ZoneProvince extends BaseEntity {
    @OneToMany(() => ZoneDistrict, zoneDistrict => zoneDistrict.zoneProvince)
    zoneDistricts: ZoneDistrict[];

    @OneToMany(() => ZoneProvinceTrans, zoneProvinceTrans => zoneProvinceTrans.zoneProvince, {eager: true})
    translations: ZoneProvinceTrans[];

    @DefColumn({nullable: true})
    normalId: number;

    @DefColumn({nullable: true})
    code: string;

    @DefColumn({default: true})
    active: boolean;

    @DefColumn({type: 'double', nullable: true, default: null})
    lat: number;

    @DefColumn({type: 'double', nullable: true, default: null})
    lng: number;

    @DefColumn({default: 0})
    sortOrder: number;
}
