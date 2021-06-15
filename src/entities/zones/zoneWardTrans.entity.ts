import { Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { ZoneWard } from './zoneWard.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
@Entity({name: 'zone_ward_trans'})
@Unique(["locale", "zoneWard"])
export class ZoneWardTrans extends BaseEntity {
    @ManyToOne(() => ZoneWard, zoneWard => zoneWard.translations, {
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "zone_ward_id" })
    zoneWard: ZoneWard;

    @DefColumn()
    locale: string;

    @DefColumn()
    name: string;
}
