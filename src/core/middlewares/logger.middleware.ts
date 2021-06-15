import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    async use(req: Record<string, any>, res: Response, next: () => void): Promise<any> {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('close', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length') || '';

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });

        return next();
    }
}
