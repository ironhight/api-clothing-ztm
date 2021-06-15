import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PagingEnum } from '@core/constants/paging.enum';

export const DefaultListQuery = (): any => {
    return applyDecorators(
        ApiQuery({ required: false, name: 'orderBy', description: 'Sort by field' }),
        ApiQuery({
            required: false,
            name: 'order',
            description: 'Sort direction, ASC is ascending, DESC is descending',
            enum: ['ASC', 'DESC'],
        }),
        ApiQuery({
            required: false,
            name: 'limit',
            description: 'Number of result',
            example: PagingEnum.DEFAULT_LIMIT,
        }),
        ApiQuery({
            required: false,
            name: 'page',
            description: 'Page of result',
            example: PagingEnum.DEFAULT_PAGE,
        }),
        ApiQuery({ required: false, name: 'excel', description: 'Export to excel', enum: [1] }),
    );
};

export const QueryPageCode = (): any => {
    return applyDecorators(
        ApiQuery({
            required: true,
            name: 'pageCode',
            description: 'Nhập PageCode: Chọn 1 trong danh sách: HOME, ABOUT',
            example: 'HOME',
        }),
    );
};