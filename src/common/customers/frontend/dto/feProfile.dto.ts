import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length, MaxLength, IsEmail, Validate } from 'class-validator';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { IsPhoneCustom } from '@core/validator/IsPhoneCustom';

export class FeProfileDto {
    @ApiProperty({
        description: 'name',
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    name: string;

    @ApiProperty({
        description: 'password',
        minLength: 7,
        maxLength: 255,
        nullable: true
    })
    @IsOptional()
    @Length(7, 255)
    password: string;

    @ApiProperty({
        description: 'email',
        uniqueItems: true,
        required: true,
        maxLength: 255,
        type: String,
    })
    @IsOptional()
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
        type: 'file'
    })
    @IsOptional()
    @MaxLength(255)
    @IsExistFileTmp([], {
        message: 'File is invalid'
    })
    profileImage: any;

    @ApiProperty({
        description: 'dateOfBirth',
        type: Date,
    })
    @IsOptional()
    dateOfBirth: Date;

    @ApiProperty({
        description: 'gender',
        type: String,
    })
    @IsOptional()
    gender: string;

    @ApiProperty({
        description: 'address',
        type: String,
    })
    @IsOptional()
    address: string;

    @ApiProperty({
        description: 'district',
        type: String,
    })
    @IsOptional()
    district: string;

    @ApiProperty({
        description: 'city',
        type: String,
    })
    @IsOptional()
    city: string;

    @ApiProperty({
        description: 'companyName',
        type: String,
    })
    @IsOptional()
    companyName: string;

    @ApiProperty({
        description: 'taxIdNumber',
        type: String,
    })
    @IsOptional()
    taxIdNumber: string;
}