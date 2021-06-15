import { Entity, JoinColumn, ManyToOne, OneToMany, Unique, Index } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneProvince } from './zoneProvince.entity';
import { ZoneWard } from './zoneWard.entity';
import { ZoneDistrictTrans } from './zoneDistrictTrans.entity';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({name: 'zone_districts'})
@Unique(['code'])
@Index(['zoneProvince'])
export class ZoneDistrict extends BaseEntity {
    @ManyToOne(() => ZoneProvince, zoneProvince => zoneProvince.zoneDistricts, {
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "zone_province_id" })
    zoneProvince: ZoneProvince;

    @OneToMany(() => ZoneWard, ZoneWard => ZoneWard.zoneDistrict)
    zoneWards: ZoneWard[];

    @OneToMany(() => ZoneDistrictTrans, zoneDistrictTrans => zoneDistrictTrans.zoneDistrict, {eager: true})
    translations: ZoneDistrictTrans[];

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
