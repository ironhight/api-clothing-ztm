import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, IsOptional, MaxLength } from 'class-validator';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';

export class UserDto {
    @ApiProperty({
        description: 'name',
        required: true,
        minLength: 6,
        maxLength: 255
    })
    @IsNotEmpty()
    @Length(6, 255)
    name: string;

    @ApiProperty({
        description: 'profileImage',
        maxLength: 255,
        nullable: true,
        type: 'file'
    })
    @IsOptional()
    @MaxLength(255)
    @IsExistFileTmp([], {
        message: 'File is invalid'
    })
    profileImage: any;

    @ApiProperty({
        description: 'email',
        uniqueItems: true,
        required: true,
        minLength: 6,
        maxLength: 255
    })
    @IsNotEmpty()
    @Length(6, 255)
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'password',
        minLength: 6,
        maxLength: 255,
        required: true
    })
    @IsNotEmpty()
    @Length(6, 255)
    password: string;

    @ApiProperty({
        description: 'active',
        required: false,
    })
    @IsOptional()
    active: boolean;

    @ApiProperty({
        description: 'id of role',
        nullable: true
    })
    @IsNotEmpty()
    role: string;

    extra;
}