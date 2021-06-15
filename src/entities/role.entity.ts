import { Entity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '@entities/baseEntity.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @OneToMany(() => User, user => user.role)
    users: User[];

    @Column({name: 'name'})
    name: string;

    @DefColumn({ name: 'is_admin', default: false })
    isAdmin: boolean;

    @Column({ name: 'permissions', type: 'json', nullable: true })
    permissions: Record<string, any>;
}
