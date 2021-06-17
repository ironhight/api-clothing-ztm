import { HttpService, Injectable } from '@nestjs/common';
import { HelperService } from '@core/services/helper.service';

@Injectable()
export class FbGraphService {
    constructor(private helperService: HelperService, private httpService: HttpService) {}

    async getProfile(accessToken: string, fields: string = 'id,name,email,picture') {
        const res = await this.httpService
            .get('https://graph.facebook.com/v11.0/me', {
                params: {
                    fields,
                    access_token: accessToken,
                },
            })
            .toPromise();

        if (res.status !== 200) this.helperService.throwException('Error in get data from access token');

        const data = res.data
        const fullNameNon = this.helperService.translateZoneNameVietnamese(data['name']);
        return {
            status: true,
            data: {
                id: data['id'],
                name: data['name'],
                nameNon: fullNameNon,
                email: data['email'],
                picture: data['picture']?.data?.url,
            },
        };
    }
}
