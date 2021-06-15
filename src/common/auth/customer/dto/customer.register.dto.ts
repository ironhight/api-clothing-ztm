import { ApiProperty } from '@nestjs/swagger';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { IsNotEmpty, IsEmail, IsOptional, MaxLength, Validate, IsString } from 'class-validator';
import { IsPhoneCustom } from '@core/validator/IsPhoneCustom';

export class CustomerRegisterDto {
    @ApiProperty({
        description: 'name',
        required: true,
        maxLength: 255,
        type: String,
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'email',
        uniqueItems: true,
        required: true,
        maxLength: 255,
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'phone',
        uniqueItems: true,
        required: true,
        maxItems: 10,
        type: String,
    })
    @IsOptional()
    @Validate(IsPhoneCustom)
    phone: string;

    @ApiProperty({
        description: 'profileImage',
        maxLength: 255,
        nullable: true,
        type: 'file',
    })
    @IsOptional()
    @MaxLength(255)
    @IsExistFileTmp([], {
        message: 'File is invalid',
    })
    profileImage: any;

    @ApiProperty({
        description: 'password',
        minLength: 7,
        maxLength: 255,
        required: true,
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'inviteCode',
        required: false,
    })
    @IsOptional()
    inviteCode: string;

    @ApiProperty({
        description: 'reCaptchaCode',
    })
    @IsNotEmpty({ message: 'reCaptchaCode là bắt buộc!' })
    reCaptchaCode: string;
}
