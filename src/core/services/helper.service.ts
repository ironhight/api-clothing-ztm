import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as Crypt from 'cryptr';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';
import { PermissionService } from '@core/services/permission.service';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const moment = require('moment');

@Injectable()
export class HelperService {
    private crypt: any;

    constructor(private configService: ConfigService) {
        this.crypt = new Crypt('DSAV65345GDVFBGR7657BFDBFD&%#%$2');
    }

    allPermissions(): Record<any, any> {
        return PermissionService.permissions.allow;
    }

    throwException(message?: string, statusCode?: number): HttpException {
        throw new HttpException(
            {
                status: false,
                statusCode: statusCode || HttpStatus.NOT_FOUND,
                message: message || 'Unknown Error',
            },
            statusCode || HttpStatus.NOT_FOUND,
        );
    }

    addDateTime(addition: string, unit: string, format?: string, datetime?: string): string {
        unit = unit || 'h';
        format = format || 'YYYY-MM-DD hh:mm:ss';
        datetime = datetime || moment().format(format);
        return moment(datetime)
            .add(addition, unit)
            .format(format);
    }

    async compareHash(plaintext: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(plaintext, hash);
    }

    async hash(plaintext: string): Promise<string> {
        return bcrypt.hash(plaintext, 10);
    }

    connectDatabase(): ConnectionOptions {
        const dbDriver = this.configService.get('db.driver');
        const dbUser = this.configService.get('db.user');
        const dbPassword = encodeURIComponent(this.configService.get('db.pass'));
        const dbHost = this.configService.get('db.host');
        const dbPort = this.configService.get('db.port');
        const dbName = this.configService.get('db.name');

        return {
            type: dbDriver,
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPassword,
            database: dbName,
            entities: [],
            synchronize: true,
            timezone: 'Z',
            namingStrategy: new SnakeNamingStrategy(),
            extra: {
                charset: "utf8mb4_unicode_ci"
            }
        };
    }

    /**
     * Encrypt a text
     * @param text
     */
    encryptText(text: string): string {
        return this.crypt.encrypt(text);
    }

    /**
     * Decrypt a text
     * @param text
     */
    decryptText(text: string): string {
        return this.crypt.decrypt(text);
    }

    /**
     * Slug a text
     * @param text
     */
    slug(text: string): string {
        return slugify(text, {
            lower: true,
        });
    }

    nonAccentVietnamese(str = '') {
        str = str.toLowerCase();

        //     We can also use this instead of from line 11 to line 17
        //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
        //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
        //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
        //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
        //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
        //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
        //     str = str.replace(/\u0111/g, "d");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    removeSignVietnamese(str = '') {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    translateZoneNameVietnamese(str = '', zoneType = 1) {
        if (zoneType == 1) {
            if (str.indexOf('Thành Phố') == 0) {
                str = str.replace('Thành Phố', '');
                str = `${str} City`;
            }
        } else if (zoneType == 2) {
            if (str.indexOf('Quận') == 0) {
                str = str.replace('Quận', '');
                if (!isNaN(parseInt(str))) {
                    str = `District${str} `;
                } else {
                    str = `${str} District`;
                }
            } else if (str.indexOf('Huyện') == 0) {
                str = str.replace('Huyện', '');
                str = `${str} Town`;
            } else if (str.indexOf('Thị Xã') == 0) {
                str = str.replace('Thị Xã', '');
                str = `${str} Town`;
            } else if (str.indexOf('Thành Phố') == 0) {
                str = str.replace('Thành Phố', '');
                str = `${str} City`;
            }
        } else if (zoneType == 3) {
            if (str.indexOf('Phường') == 0) {
                str = str.replace('Phường', '');
                str = `${str} Ward`;
            } else if (str.indexOf('Xã') == 0) {
                str = str.replace('Xã', '');
                str = `${str} Commune`;
            } else if (str.indexOf('Thị Trấn') == 0) {
                str = str.replace('Thị Trấn', '');
                str = `${str} Town`;
            }
        }

        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

        return str;
    }

    filterKeys(object: Object, keys: Array<string> = [], allowed: boolean = true): Object {
        keys = [...keys, 'page', 'limit', 'get'];
        if (keys.length > 0) {
            Object.keys(object).forEach(function(key) {
                if (keys.indexOf(key) == -1 && allowed === true) {
                    delete object[key];
                } else if (keys.indexOf(key) != -1 && allowed === false) {
                    delete object[key];
                }
            });
        }
        return object;
    }
}
