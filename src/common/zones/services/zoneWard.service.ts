import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In,  } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { isNotEmpty, isIn } from 'class-validator';
import { HelperService } from '@core/services/helper.service';
import { ZoneWard } from "@entities/zones/zoneWard.entity";
import { ZoneWardTrans } from "@entities/zones/zoneWardTrans.entity";
@Injectable()
export class ZoneWardService {
    private locale;

    constructor(
        @Inject(REQUEST) private request: any,
        @InjectRepository(ZoneWard) private zoneWard: Repository<ZoneWard>,
        @InjectRepository(ZoneWardTrans) private zoneWardTrans: Repository<ZoneWardTrans>,
        private helperService: HelperService,
    ) {
        this.locale = this.request.locale == 'vi' ? 'viNon' : this.request.locale;
    }

    async findAll(query: Record<string, any>): Promise<any> {
        let page = query.page;
        let limit = query.limit;
        let where = {};
        let order = {};
        order[query.orderBy] = query.order;

        if (isNotEmpty(query.zoneDistrict)) {
            where['zoneDistrict'] = query.zoneDistrict;
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
            return this.zoneWard.find({
                order, take,
                join: { alias: 'zoneWards', innerJoin: { translations: 'zoneWards.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneWard>(this.zoneWard, { page, limit }, {
                order,
                join: { alias: 'zoneWards', innerJoin: { translations: 'zoneWards.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        }
    }

    async findAllFrontend(query: Record<string, any>): Promise<any> {
        let page = query.page;
        let limit = query.limit;
        let where = {};
        where['active'] = true;
        let order = {};
        order[query.orderBy] = query.order;

        if (isNotEmpty(query.zoneDistrict)) {
            where['zoneDistrict'] = query.zoneDistrict;
        }

        if (isNotEmpty(query.idNotIn)) {
            where['id'] = Not(In(query.idNotIn));
        }

        if(isNotEmpty(query.get)) {
            let get = parseInt(query.get);
            let take = isNaN(get) ? undefined : get;
            return this.zoneWard.find({
                order, take,
                join: { alias: 'zoneWards', innerJoin: { translations: 'zoneWards.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneWard>(this.zoneWard, { page, limit }, {
                order,
                join: { alias: 'zoneWards', innerJoin: { translations: 'zoneWards.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        }
    }

    async findById(id: number): Promise<ZoneWard> {
        return this.zoneWard.findOne(id);
    }

    async findByNormalId(normalId: number): Promise<ZoneWard> {
        return this.zoneWard.findOne({
            normalId
        });
    }

    async detail(id: number): Promise<any> {
        return this.zoneWard.findOne(id);
    }

    async create(data: Object): Promise<ZoneWard> {
        data['active'] = data['active'] == 'true' ? true : false;
        let item = await this.zoneWard.save(data);
        if(item && typeof data['translations'] != 'undefined')
            await this.zoneWardTrans.save(data['translations'].map(tran => { return {...tran, zoneWard: item} }));
        return this.detail(item.id);
    }

    async update(id: number, data: Object): Promise<any> {
        if(typeof data['active'] != 'undefined') data['active'] = data['active'] == 'true' ? true : false;
        let translations = data['translations'] || null;
        if(translations) {
            await this.zoneWardTrans.createQueryBuilder().delete().from(ZoneWardTrans)
            .where('zoneWard = :id', { id: id }).execute();
        }
        delete data['translations'];
        let item = await this.zoneWard.update(id, data);
        if(item && translations)
            await this.zoneWardTrans.save(translations.map(tran => { return {...tran, zoneDistrict: id} }));
        return this.detail(id);
    }

    async delete(id: number): Promise<any> {
        let item = await this.detail(id);
        return this.zoneWard.remove(item);
    }

    async deleteManyById(ids: Array<number>): Promise<any> {
        ids.forEach(id => { return this.delete(id) });
        return true;
    }

    async truncate(): Promise<any> {
        await this.zoneWard.query('TRUNCATE TABLE zone_wards');
        return await this.zoneWard.query('TRUNCATE TABLE zone_ward_trans');
    }

    async totalZoneWard(): Promise<any> {
        return await this.zoneWard.count();
    }

    async totalInActiveZoneWard(): Promise<any> {
        return await this.zoneWard.count({active: false});
    }
}
