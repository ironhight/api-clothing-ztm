import { Entity } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';

@Entity({ name: 'payment_methods' })
export class PaymentMethod extends BaseEntity {
    @DefColumn()
    name: string;

    @DefColumn({ default: true })
    active: boolean;

    @DefColumn()
    gateway: string;

    @DefColumn({ type: 'json' })
    config: any;
}
