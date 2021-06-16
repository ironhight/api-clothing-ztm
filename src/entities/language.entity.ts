import { Entity, Unique } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { OneToMany } from 'typeorm';
import { ProductTranslation } from './productTranslation.entity';

@Entity({ name: 'languages' })
@Unique(['code'])
export class Language extends BaseEntity {
    @DefColumn()
    name: string;

    @DefColumn()
    code: string;

    @OneToMany(() => ProductTranslation, (productTranslation) => productTranslation.language)
    productTranslations: ProductTranslation[];
}
