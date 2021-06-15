import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { HeaderEnum } from '@core/constants/header.enum';

export const DefaultHeader = (): any => {
    return applyDecorators(
        ApiHeader({
            name: HeaderEnum.locale,
            required: false,
            description: 'Locale header',
            example: 'en',
        }),
    );
};
