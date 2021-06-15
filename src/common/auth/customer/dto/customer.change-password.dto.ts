import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordCustomerDto {
    @ApiProperty({
        description: 'oldPassword',
        maxLength: 255,
    })
    @IsNotEmpty()
    oldPassword: string;

    @ApiProperty({
        description: 'newPassword',
        maxLength: 255,
    })
    @IsNotEmpty()
    newPassword: string;
}
