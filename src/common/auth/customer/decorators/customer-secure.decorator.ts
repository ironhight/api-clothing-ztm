import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CustomerGuard } from "@src/common/auth/customer/guards/customer.guard";

export const CustomerSecure = (): any => {
    return applyDecorators(
        UseGuards(CustomerGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({description: 'Unauthorized'}),
    );
};
