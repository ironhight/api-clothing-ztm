import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class RoleDto {
    @ApiProperty({
        description: 'name',
        required: true,
        maxLength: 255,
    })
    @MaxLength(255)
    name: string;

    @ApiProperty({
        description: 'isAdmin',
        required: true,
    })
    @IsNotEmpty()
    isAdmin: boolean;

    @ApiProperty({
        type: Object,
        description: 'permissions',
        required: false,
    })
    @IsOptional()
    permissions: Object;
}
