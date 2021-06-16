import { Entity } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({ name: 'payment_transactions' })
export class PaymentTransaction extends BaseEntity {
    @DefColumn()
    orderId: number;

    @DefColumn({ type: 'enum', enum: ['processing', 'final'] })
    step: 'processing' | 'final';
}
