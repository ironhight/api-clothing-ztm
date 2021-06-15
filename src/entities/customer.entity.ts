import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Log } from '@entities/log.entity';

type customerRegisterSourceEnum = 'app' | 'google' | 'facebook';

@Entity({ name: 'customers' })
export class Customer extends BaseEntity {
    private thumbnail = {
        collection: 'customers',
        method: 'inside',
        fields: {
            profileImage: {
                FB: '600x314',
            },
        },
    };

    @Column()
    name: string;

    @DefColumn({ nullable: true })
    profileImage?: string;

    @OneToMany(
        () => Log,
        log => log.customer,
    )
    logs: Log[];

    @Column()
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ nullable: true })
    token: string;

    @DefColumn({ nullable: true })
    profileId: string;

    @DefColumn({ type: 'enum', enum: ['app', 'google', 'facebook'], default: 'app' })
    registerSource: customerRegisterSourceEnum;

    @DefColumn({ nullable: true })
    resetCode: string;

    @DefColumn({ nullable: true, type: 'datetime' })
    expireResetCode: Date;

    @DefColumn({ nullable: true })
    inviteCode: string;

    @DefColumn({ nullable: true, type: 'datetime' })
    expireInviteCode: string;

    @DefColumn({ nullable: true })
    affiliateId: number;
}
