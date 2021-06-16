import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Order } from './order.entity';

@Entity({ name: 'payment_histories' })
export class PaymentHistory extends BaseEntity {
    @ManyToOne(() => Order, (order) => order.paymentHistories, {
        createForeignKeyConstraints: false,
        onUpdate: 'SET NULL',
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @DefColumn()
    gateway: string;

    @DefColumn({ type: 'json' })
    extendsData: any;
}
