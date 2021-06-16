import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Language } from './language.entity';
import { JoinColumn } from 'typeorm';

@Entity({ name: 'product_translations' })
export class ProductTranslation extends BaseEntity {
    @DefColumn()
    name: string;

    @ManyToOne(() => Language, (language) => language.productTranslations, {
        createForeignKeyConstraints: false,
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'language_id' })
    language: Language;
}
