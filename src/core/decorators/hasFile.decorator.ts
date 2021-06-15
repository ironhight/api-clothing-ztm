import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { anyField } from '@core/config/multer';

export const HasFile = (): any => {
    return applyDecorators(
        UseInterceptors(anyField()),
        ApiConsumes('multipart/form-data'),
    );
};
