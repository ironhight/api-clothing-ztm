import { Entity } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { OneToMany } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @DefColumn({ type: 'json' })
    paymentMethod: any;

    @DefColumn()
    total: number;

    @DefColumn({ type: 'json' })
    customer: any;

    @DefColumn()
    customerId: number;

    @DefColumn()
    gateway: string;

    @DefColumn()
    orderId: string;

    @DefColumn()
    requestId: string;

    @DefColumn()
    title: string;

    @DefColumn({ nullable: true })
    description: string;

    @DefColumn({ nullable: true })
    subtotal: number;

    @DefColumn({ nullable: true })
    discount: number;

    @DefColumn({ nullable: true })
    shipping: number;

    @DefColumn({ nullable: true })
    shippingDiscount: number;

    @DefColumn({ nullable: true })
    tax: number;

    @DefColumn({ type: 'json' })
    shippingAddress: any;

    @OneToMany(() => PaymentHistory, paymentHistory => paymentHistory.order)
    paymentHistories?: PaymentHistory[];
}
