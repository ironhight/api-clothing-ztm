import { HttpService, Injectable } from '@nestjs/common';
import { HelperService } from './helper.service';
import * as qs from 'qs';

@Injectable()
export class GoogleApiService {
    constructor(
        private readonly httpService: HttpService,
        private readonly helperServcie: HelperService,
    ) {}

    async getProfile(
        accessToken: string,
    ): Promise<{
        status: boolean;
        data?: { id: string; name: string; nameNon: string; email: string, picture: string };
    }> {
        return await this.httpService
            .request({
                url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
                method: 'GET',
                maxRedirects: 1,
                timeout: 500,
            })
            .toPromise()
            .then(res => {
                let data = res.data;
                let fullNameNon = this.helperServcie.translateZoneNameVietnamese(data['name']);
                return {
                    status: true,
                    data: {
                        id: data['sub'],
                        name: data['name'],
                        nameNon: fullNameNon,
                        email: data['email'],
                        picture: data['picture'],
                    },
                };
            })
            .catch(() => {
                return { status: true };
            });
    }

    async verifyCapcha(reCapchaCode: string): Promise<{ status: boolean }> {
        return await this.httpService
            .request({
                url: `https://www.google.com/recaptcha/api/siteverify`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
                data: qs.stringify({
                    secret: `${process.env.RECAPTCHA_SECRET_KEY}`,
                    response: `${reCapchaCode}`,
                }),
                maxRedirects: 1,
                timeout: 500,
            })
            .toPromise()
            .then(res => {
                let data = res.data;
                let status = data['success'] ? true : false;
                return { status };
            })
            .catch(() => {
                return { status: false };
            });
    }
}
