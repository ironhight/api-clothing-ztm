import { Entity, JoinColumn, ManyToOne, OneToMany, Unique, Index } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneDistrict } from './zoneDistrict.entity';
import { ZoneWardTrans } from './zoneWardTrans.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
@Entity({name: 'zone_wards'})
@Unique(['code'])
@Index(['zoneDistrict'])
export class ZoneWard extends BaseEntity {
    @ManyToOne(() => ZoneDistrict, zoneDistrict => zoneDistrict.zoneWards, {
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "zone_district_id" })
    zoneDistrict: ZoneDistrict;

    @OneToMany(() => ZoneWardTrans, zoneWardTrans => zoneWardTrans.zoneWard, {eager: true})
    translations: ZoneWardTrans[];

    @DefColumn({nullable: true})
    normalId: number;

    @DefColumn({nullable: true})
    code: string;

    @DefColumn({ default: true})
    active: boolean;

    @DefColumn({type: 'double', nullable: true, default: null})
    lat: number;

    @DefColumn({type: 'double', nullable: true, default: null})
    lng: number;

    @DefColumn({default: 0})
    sortOrder: number;
}
