import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneProvince } from './zoneProvince.entity';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({name: 'zone_province_trans'})
@Unique(["locale", "zoneProvince"])
export class ZoneProvinceTrans extends BaseEntity {
    
    @ManyToOne(() => ZoneProvince, zoneProvince => zoneProvince.translations, {
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "zone_province_id" })
    zoneProvince: ZoneProvince;

    @DefColumn()
    locale: string;

    @DefColumn()
    name: string;
}
