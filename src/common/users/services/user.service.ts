import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, In } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { isIn, isNotEmpty } from "class-validator";
import { HelperService } from '@core/services/helper.service';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { User } from '@entities/user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private user: Repository<User>,
        private helperService: HelperService,
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

        if (isNotEmpty(query.email)) {
            where['email'] = Like(`%${query.email}%`);
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
            return this.user.find({
                order, take,
                where: qb => {
                    qb.where(where);
                },
            });
        } else {
            return paginate<User>(this.user, { page, limit }, {
                order,
                where: qb => {
                    qb.where(where);
                },
            });
        }
    }

    async findOne(query: Record<string, any>, options?: Record<string, any>): Promise<User> {
        return this.user.findOne({ ...query }, { ...options });
    }

    async firstAdmin(): Promise<User> {
       return this.user.findOne({active: true});
    }

    async create(data: Object, files?: Record<any, any>): Promise<User> {
        data['password'] = await this.helperService.hash(data['password']);
        data['active'] = data['active'] == 'true' ? true : false;
        convertContentFileDto(data, files, ['profileImage']);
        let entity = Object.assign(new User(), data);
        let item = await this.user.save(entity);
        saveThumbOrPhotos(item);
        return this.detail(item.id);
    }

    async update(id: number, data: Object, files?: Record<any, any>): Promise<User> {
        if(typeof data['password'] != 'undefined') data['password'] = await this.helperService.hash(data['password']);
        if(typeof data['active'] != 'undefined') data['active'] = data['active'] == 'true' ? true : false;
        convertContentFileDto(data, files, ['profileImage']);
        let item = await this.user.update(id, data);
        if(item) saveThumbOrPhotos(await this.detail(id));
        return this.detail(id);
    }

    async detail(id: number): Promise<any> {
        return this.user.findOne(id);
    }

    async delete(id: number): Promise<any> {
        let item = await this.detail(id);
        return this.user.remove(item);
    }

    async totalUser(): Promise<any> {
        return await  this.user.count();
    }

    async totalInActiveUser(): Promise<any> {
        return await this.user.count({active: false});
    }
}
