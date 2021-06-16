import { Entity } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @DefColumn({ default: true })
    active: boolean;

    @DefColumn()
    image: string;

    @DefColumn()
    price: number;
}
