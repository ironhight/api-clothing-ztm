import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, In } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { isNotEmpty, isIn } from 'class-validator';
import { Role } from '@entities/role.entity';
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private role: Repository<Role>,
    ) {}

    async findAll(query: Record<string, any>): Promise<any> {
        let page = query.page;
        let limit = query.limit;
        let where = {};
        let order = {};
        order[query.orderBy] = query.order;

        if (isNotEmpty(query.name)) {
            where['name'] = Like(`%${query.name}%`);
        }

        if (isIn(query['active'], [true, false, 'true', 'false'])) {
            where['active'] = query['active'] == 'true' ? true : false;
        }

        if (isNotEmpty(query.idNotIn)) {
            where['id'] = Not(In(query.idNotIn));
        }

        if(isNotEmpty(query.get)) {
            let get = parseInt(query.get);
            let take = isNaN(get) ? undefined : get;
            return this.role.find({
                order, take,
                where: qb => {
                    qb.where(where);
                },
            });
        } else {
            return paginate<Role>(this.role, { page, limit }, {
                order,
                where: qb => {
                    qb.where(where);
                },
            });
        }
    }

    async detail(id: number): Promise<Role> {
        return this.role.findOne(id);
    }

    async create(data: Object): Promise<Role> {
        data['isAdmin'] = data['isAdmin'] == 'true' ? true : false;
        return this.role.save(data);
    }

    async update(id: number, data: Object): Promise<any> {
        if(typeof data['isAdmin'] != 'undefined') data['isAdmin'] = data['isAdmin'] == 'true' ? true : false;
        await this.role.update(id, data);
        return this.detail(id);
    }

    async delete(id: number): Promise<any> {
        let item = await this.detail(id);
        return this.role.remove(item);
    }

    async totalRole(): Promise<any> {
        return await this.role.count();
    }

    async totalAdminRole(): Promise<any> {
        return await this.role.count({isAdmin: true});
    }
}
