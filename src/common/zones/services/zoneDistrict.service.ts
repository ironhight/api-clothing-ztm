import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, SimpleConsoleLogger,  } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { REQUEST } from '@nestjs/core';
import { isNotEmpty, isIn } from 'class-validator';
import { ZoneDistrict } from "@entities/zones/zoneDistrict.entity";
import { ZoneDistrictTrans } from "@entities/zones/zoneDistrictTrans.entity";
import { HelperService } from '@core/services/helper.service';
@Injectable()
export class ZoneDistrictService {
    private locale;

    constructor(
        @Inject(REQUEST) private request: any,
        @InjectRepository(ZoneDistrict) private zoneDistrict: Repository<ZoneDistrict>,
        @InjectRepository(ZoneDistrictTrans) private zoneDistrictTrans: Repository<ZoneDistrictTrans>,
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

        if (isNotEmpty(query.zoneProvince)) {
            where['zoneProvince'] = query.zoneProvince;
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
            return this.zoneDistrict.find({
                order, take,
                join: { alias: 'zoneDistricts', innerJoin: { translations: 'zoneDistricts.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneDistrict>(this.zoneDistrict, { page, limit }, {
                order,
                join: { alias: 'zoneDistricts', innerJoin: { translations: 'zoneDistricts.translations' } },
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

        if (isNotEmpty(query.zoneProvince)) {
            where['zoneProvince'] = query.zoneProvince;
        }

        if (isNotEmpty(query.idNotIn)) {
            where['id'] = Not(In(query.idNotIn));
        }

        if(isNotEmpty(query.get)) {
            let get = parseInt(query.get);
            let take = isNaN(get) ? undefined : get;
            return this.zoneDistrict.find({
                order, take,
                join: { alias: 'zoneDistricts', innerJoin: { translations: 'zoneDistricts.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        } else {
            return paginate<ZoneDistrict>(this.zoneDistrict, { page, limit }, {
                order,
                join: { alias: 'zoneDistricts', innerJoin: { translations: 'zoneDistricts.translations' } },
                where: qb => {
                    qb.where(where)
                    if(query.name) {
                        qb.andWhere('translations.name LIKE :name', { name: `%${query.name}%` });
                    }
                },
            });
        }
    }

    async findById(id: number): Promise<ZoneDistrict> {
        return this.zoneDistrict.findOne(id);
    }

    async findByNormalId(normalId: number): Promise<ZoneDistrict> {
        return this.zoneDistrict.findOne({
            normalId
        });
    }

    async detail(id: number): Promise<any> {
        return this.zoneDistrict.findOne(id);
    }

    async create(data: Object): Promise<ZoneDistrict> {
        data['active'] = data['active'] == 'true' ? true : false;
        let item = await this.zoneDistrict.save(data);
        if(item && typeof data['translations'] != 'undefined')
            await this.zoneDistrictTrans.save(data['translations'].map(tran => { return {...tran, zoneDistrict: item} }));
        return this.detail(item.id);
    }

    async update(id: number, data: Object): Promise<any> {
        if(typeof data['active'] != 'undefined') data['active'] = data['active'] == 'true' ? true : false;
        let translations = data['translations'] || null;
        if(translations) {
            await this.zoneDistrictTrans.createQueryBuilder().delete().from(ZoneDistrictTrans)
            .where('zoneDistrict = :id', { id: id }).execute();
        }
        delete data['translations'];
        let item = await this.zoneDistrict.update(id, data);
        if(item && translations)
            await this.zoneDistrictTrans.save(translations.map(tran => { return {...tran, zoneDistrict: id} }));
        return this.detail(id);
    }

    async delete(id: number): Promise<any> {
        let item = await this.detail(id);
        return this.zoneDistrict.remove(item);
    }

    async deleteManyById(ids: Array<number>): Promise<any> {
        ids.forEach(id => { return this.delete(id) });
        return true;
    }

    async truncate(): Promise<any> {
        await this.zoneDistrict.query('TRUNCATE TABLE zone_districts');
        return await this.zoneDistrict.query('TRUNCATE TABLE zone_district_trans');
    }

    async totalZoneDistrict(): Promise<any> {
        return await this.zoneDistrict.count();
    }

    async totalInActiveZoneDistrict(): Promise<any> {
        return await this.zoneDistrict.count({active: false});
    }
}
