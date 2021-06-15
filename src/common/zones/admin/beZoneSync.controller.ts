import {
    Controller,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { Permissions } from "@core/services/permission.service";
import { UserSecure } from "@common/auth/user/decorators/user-secure.decorator";
import { ACL } from '@common/auth/decorators/acl.decorator';
import { ResponseService } from '@core/services/response.service';
import { ApiTags } from '@nestjs/swagger';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { ZoneProvinceService } from '../services/zoneProvince.service';
import { ZoneDistrictService } from '../services/zoneDistrict.service';
import { ZoneWardService } from '../services/zoneWard.service';
import { TransformerZoneService } from '../services/transformerZone.service';
import { HelperService } from '@core/services/helper.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@ApiTags('Admin/ZoneSync')
@Controller('admin/zone-sync')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class BeZoneSyncController {
    constructor(
        private zoneProvince: ZoneProvinceService,
        private zoneDistrict: ZoneDistrictService,
        private zoneWard: ZoneWardService,
        private transformer: TransformerZoneService,
        private response: ResponseService,
        private helper: HelperService
    ) {}

    @Put('provinces')
    @ACL(Permissions.zone_province_sync)
    async syncProvince(@Query() query: Record<string, any>): Promise<any> {
        let self = this;
        await this.zoneProvince.truncate();
        await fs.createReadStream(`storage/data/zoneProvinces.csv`).pipe(csv()).on('data', async (row) => {
            await self.zoneProvince.create({
                normalId: row['id'],
                code: row['code'] == 'NULL' ? null : row['code'],
                active: row['status'] == '1' ? true : false,
                lat: row['lat'] == 'NULL' ? null : row['lat'],
                lng: row['lng'] == 'NULL' ? null : row['lng'],
                sortOrder: row['sortOrder'],
                translations: [
                    {locale: 'vi', name: row['name']},
                    {locale: 'en', name: await self.helper.translateZoneNameVietnamese(row['name'], 1)}
                ]
            });
        }).on('end', () => {
            console.log('Sync Province end!')
        });

        return {status: true};
    }

    @Put('districts')
    @ACL(Permissions.zone_district_sync)
    async syncDistrict(@Query() query: Record<string, any>): Promise<any> {
        let self = this;
        let provinceOfDistricts = {};
        await this.zoneDistrict.truncate();
        await fs.createReadStream(`storage/data/zoneDistricts.csv`).pipe(csv()).on('data', async (row) => {
            provinceOfDistricts[row['provinceId']] = provinceOfDistricts[row['provinceId']] || [];
            provinceOfDistricts[row['provinceId']].push(row);
        }).on('end', async () => {
            await Promise.all(Object.keys(provinceOfDistricts).map(async function(provinceId) {
                const province = await self.zoneProvince.findByNormalId(parseInt(provinceId));
                if(!province) return;
                await Promise.all(provinceOfDistricts[provinceId].map(async function(district) {
                    await self.zoneDistrict.create({
                        zoneProvince: province.id,
                        normalId: district['id'],
                        code: district['code'] == 'NULL' ? null : district['code'],
                        active: district['status'] == '1' ? true : false,
                        lat: district['lat'] == 'NULL' ? null : district['lat'],
                        lng: district['lng'] == 'NULL' ? null : district['lng'],
                        sortOrder: district['sortOrder'],
                        translations: [
                            {locale: 'vi', name: district['name']},
                            {locale: 'en', name: await self.helper.translateZoneNameVietnamese(district['name'], 2)}
                        ]
                    });
                }));
            }));
            console.log('Sync District end!');
        });

        return {status: true};
    }

    @Put('wards')
    @ACL(Permissions.zone_ward_sync)
    async syncWard(@Query() query: Record<string, any>): Promise<any> {
        let self = this;
        let districtOfWards = {};
        await this.zoneWard.truncate();
        await fs.createReadStream(`storage/data/zoneWards.csv`).pipe(csv()).on('data', async (row) => {
            districtOfWards[row['districtId']] = districtOfWards[row['districtId']] || [];
            districtOfWards[row['districtId']].push(row);
        }).on('end', async () => {
            await Promise.all(Object.keys(districtOfWards).map(async function(districtId) {
                const district = await self.zoneDistrict.findByNormalId(parseInt(districtId));
                if(!district) return;
                await Promise.all(districtOfWards[districtId].map(async function(ward) {
                    await self.zoneWard.create({
                        zoneDistrict: district.id,
                        normalId: ward['id'],
                        code: ward['code'] == 'NULL' ? null : ward['code'],
                        active: ward['status'] == '1' ? true : false,
                        name: {
                            vi: ward['name'],
                            en: await self.helper.translateZoneNameVietnamese(ward['name'], 3),
                        },
                        lat: ward['lat'] == 'NULL' ? null : ward['lat'],
                        lng: ward['lng'] == 'NULL' ? null : ward['lng'],
                        sortOrder: ward['sortOrder'],
                        translations: [
                            {locale: 'vi', name: ward['name']},
                            {locale: 'en', name: await self.helper.translateZoneNameVietnamese(ward['name'], 3)}
                        ]
                    });
                }));
            }));
            console.log('Sync Ward end!');
        });

        return {status: true};
    }
}
