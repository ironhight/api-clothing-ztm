import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length, IsNotEmpty, IsEmail } from 'class-validator';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';

export class ProfileDto {
    @ApiProperty({
        description: 'profileImage',
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    @IsExistFileTmp([], {
        message: 'File is invalid'
    })
    profileImage: string;

    @ApiProperty({
        description: 'name',
        minLength: 6,
        maxLength: 255,
        nullable: true
    })
    @IsNotEmpty()
    @Length(6, 255)
    name: string;

    @ApiProperty({
        description: 'email',
        uniqueItems: true,
        minLength: 6,
        maxLength: 255,
        nullable: true
    })
    @IsNotEmpty()
    @Length(6, 255)
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'newPassword',
        minLength: 6,
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    @Length(6, 255)
    currentPassword: string;

    @ApiProperty({
        description: 'password',
        minLength: 6,
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    @Length(6, 255)
    password: string;
}