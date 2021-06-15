import { Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneDistrict } from './zoneDistrict.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
@Entity({name: 'zone_district_trans'})
@Unique(["locale", "zoneDistrict"])
export class ZoneDistrictTrans extends BaseEntity {
    @ManyToOne(() => ZoneDistrict, zoneDistrict => zoneDistrict.translations, {
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "zone_district_id" })
    zoneDistrict: ZoneDistrict;

    @DefColumn()
    locale: string;

    @DefColumn()
    name: string;
}
