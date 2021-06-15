import { Injectable, NestMiddleware } from '@nestjs/common';
import { PagingEnum } from "@core/constants/paging.enum";
import { isNotEmpty } from 'class-validator';

@Injectable()
export class PagingMiddleware implements NestMiddleware {
    use(req: Record<string, any>, res: Response, next: () => void): any {
        req.query.page = +req.query.page || PagingEnum.DEFAULT_PAGE;
        req.query.limit = +req.query.limit || PagingEnum.DEFAULT_MAX_LIMIT;
        req.query.orderBy = req.query.orderBy || 'id';
        req.query.order = req.query.order == 1 ? 'ASC' : 'DESC';
        req.query.sorts = req.query.sorts || {};
        req.query.hasPaginate = isNotEmpty(req.query.hasPaginate) ? true : false;

        if (req.query.limit > PagingEnum.DEFAULT_MAX_LIMIT) {
            req.query.limit = PagingEnum.DEFAULT_MAX_LIMIT;
        }

        next();
    }
}
