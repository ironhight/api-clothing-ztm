import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Entity, Index } from 'typeorm';
@Entity({ name: 'token_blacklists' })
@Index(['token'])
@Index(['guard'])
export class TokenBlacklist extends BaseEntity {
    @DefColumn()
    token: string;

    @DefColumn()
    guard: string;

    @DefColumn()
    expireAt: Date;
}
