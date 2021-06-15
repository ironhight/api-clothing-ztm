import { Entity, Unique, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '@entities/baseEntity.entity';
import { Role } from './role.entity';
import { DefColumn } from '@core/decorators/entity.decorator';
import { Log } from './log.entity';
@Entity({ name: 'users' })
@Unique(['email'])
@Index(['role'])
export class User extends BaseEntity {
    private thumbnail = {
        collection: 'users',
        method: 'inside',
        compress: {
            profileImage: { jpg: 75, png: 75, svg: 75, gif: 75, },
        },
        fields: {
            profileImage: {
                FB: '600x314',
            },
        },
    };

    @ManyToOne(() => Role, role => role.users, { 
        createForeignKeyConstraints: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn({name: 'role_id'})
    role: Role;

    @OneToMany(() => Log, log => log.user)
    @JoinColumn()
    logs: Log[];

    @DefColumn()
    name: string;

    @DefColumn({ nullable: true })
    profileImage: string;

    @DefColumn()
    email: string;

    @DefColumn()
    password: string;

    @DefColumn({ default: true })
    active: boolean;

    @DefColumn({ nullable: true })
    token: string;
}
