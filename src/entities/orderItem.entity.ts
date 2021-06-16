import { DefColumn } from '@src/core/decorators/entity.decorator';
import { Entity } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
    @DefColumn()
    productId: number;

    @DefColumn()
    amount: number;

    @DefColumn()
    price: number;

    @DefColumn()
    orderId: number;

    @DefColumn()
    gateway: string;

    @DefColumn({ type: 'json' })
    product: any;
}
