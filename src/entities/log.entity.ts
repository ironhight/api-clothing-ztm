import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { User } from './user.entity';
@Entity({ name: 'logs' })
export class Log extends BaseEntity {
    @ManyToOne(() => Customer, customer => customer.logs)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, user => user.logs)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @DefColumn()
    statusCode: number;

    @DefColumn()
    ip: string;

    @DefColumn()
    userAgent: string;

    @DefColumn()
    url: string;

    @DefColumn()
    method: string;

    @DefColumn({ type: 'json' })
    detail: Object;

    @DefColumn()
    expireAt: Date;
}
