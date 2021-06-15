import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { isNotEmpty, isIn } from 'class-validator';
import { HelperService } from '@core/services/helper.service';
import { ZoneProvince } from "@entities/zones/zoneProvince.entity";
import { ZoneProvinceTrans } from "@entities/zones/zoneProvinceTrans.entity ";
@Injectable()
export class ZoneProvinceService {
    private locale;

    constructor(
        @Inject(REQUEST) private request: any,
        @InjectRepository(ZoneProvince) private zoneProvince: Repository<ZoneProvince>,
        @InjectRepository(ZoneProvinceTrans) private zoneProvinceTrans: Repository<ZoneProvinceTrans>,
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

        if (isIn(query['active'], [true, false, 'true', 'false'])) {
            where['active'] = query['active'] == 'true' ? true : false;
        }

        if (isNotEmpty(query.idNotIn)) {
            where['id'] = Not(In(query.idNotIn));
        }

        if(isNotEmpty(query.get)) {
            let get = parseInt(query.get);
            let take = isNaN(get) ? undefined : get;
            return this.zoneProvince.find({
                order, take,
                join: { alias: 'zoneProvinces', innerJoin: { translations: 'zoneProvinces.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneProvince>(this.zoneProvince, { page, limit }, {
                order,
                join: { alias: 'zoneProvinces', innerJoin: { translations: 'zoneProvinces.translations' } },
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

        if (isNotEmpty(query.idNotIn)) {
            where['id'] = Not(In(query.idNotIn));
        }

        if(isNotEmpty(query.get)) {
            let get = parseInt(query.get);
            let take = isNaN(get) ? undefined : get;
            return this.zoneProvince.find({
                order, take,
                join: { alias: 'zoneProvinces', innerJoin: { translations: 'zoneProvinces.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneProvince>(this.zoneProvince, { page, limit }, {
                order,
                join: { alias: 'zoneProvinces', innerJoin: { translations: 'zoneProvinces.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        }
    }

    async findById(id: number): Promise<ZoneProvince> {
        return this.zoneProvince.findOne(id);
    }

    async findByNormalId(normalId: number): Promise<ZoneProvince> {
        return this.zoneProvince.findOne({
            normalId
        });
    }

    async findByIdFrontend(id: number): Promise<ZoneProvince> {
        return this.zoneProvince.findOne({
            id: id,
            active: true
        });
    }

    async detail(id: number): Promise<any> {
        return this.zoneProvince.findOne(id);
    }

    async create(data: Object): Promise<ZoneProvince> {
        data['active'] = data['active'] == 'true' ? true : false;
        let item = await this.zoneProvince.save(data);
        if(item && typeof data['translations'] != 'undefined')
            await this.zoneProvinceTrans.save(data['translations'].map(tran => { return {...tran, zoneProvince: item} }));
        return this.detail(item.id);
    }

    async update(id: number, data: Object): Promise<any> {
        if(typeof data['active'] != 'undefined') data['active'] = data['active'] == 'true' ? true : false;
        let translations = data['translations'] || null;
        if(translations) {
            await this.zoneProvinceTrans.createQueryBuilder().delete().from(ZoneProvinceTrans)
            .where('zoneProvince = :id', { id: id }).execute();
        }
        delete data['translations'];
        let item = await this.zoneProvince.update(id, data);
        if(item && translations)
            await this.zoneProvinceTrans.save(translations.map(tran => { return {...tran, zoneProvince: id} }));
        return this.detail(id);
    }

    async delete(id: number): Promise<any> {
        let item = await this.detail(id);
        return this.zoneProvince.remove(item);
    }

    async deleteManyById(ids: Array<number>): Promise<any> {
        ids.forEach(id => { return this.delete(id) });
        return true;
    }

    async truncate(): Promise<any> {
        await this.zoneProvince.query('TRUNCATE TABLE zone_provinces');
        return await this.zoneProvince.query('TRUNCATE TABLE zone_province_trans');
    }

    async totalZoneProvince(): Promise<any> {
        return await this.zoneProvince.count();
    }

    async totalInActiveZoneProvince(): Promise<any> {
        return await this.zoneProvince.count({active: false});
    }
}
