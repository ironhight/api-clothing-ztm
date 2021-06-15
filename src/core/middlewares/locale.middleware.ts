import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HelperService } from '@core/services/helper.service';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
    constructor( private readonly helperService: HelperService,) {}

    async use(req: Record<string, any>, res: Record<string, any>, next: () => void): Promise<any> {
        req.locale = req.header('X-localization') || 'vi';
        next();
    }
}
