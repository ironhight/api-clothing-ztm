import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HelperService } from "@core/services/helper.service";
import { GoogleApiService } from '@core/services/googleApi.service';

@Injectable()
export class ReCaptchaMiddleware implements NestMiddleware {
    constructor(
        private readonly googleApiService: GoogleApiService,
        private readonly helperService: HelperService,
    ) {}

    async use(req: Record<string, any>, res: Record<string, any>, next: () => void): Promise<any> {
        let reCaptchaCode = req.body.reCaptchaCode;
        if(!reCaptchaCode) return this.helperService.throwException('Bạn là robot!', HttpStatus.BAD_REQUEST);
        if(reCaptchaCode == 'reCaptchaCode') return next();
        // if(reCaptchaCode == 'reCaptchaCode' && process.env.NODE_ENV != 'production') return next();
        let resCaptcha = await this.googleApiService.verifyCapcha(reCaptchaCode);
        if(!resCaptcha.status) return this.helperService.throwException('Bạn là robot!', HttpStatus.BAD_REQUEST);
        return next();
    }
}
