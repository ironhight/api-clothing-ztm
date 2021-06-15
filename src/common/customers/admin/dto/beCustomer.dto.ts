import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsOptional, MaxLength, Validate, IsString } from 'class-validator';
import { IsExistFileTmp } from '@core/validator/IsExistFileTmp';
import { IsPhoneCustom } from '@core/validator/IsPhoneCustom';

export class BeCustomerDto {
    @ApiProperty({
        description: 'name',
        required: true,
        minLength: 7,
        maxLength: 255,
    })
    @IsNotEmpty()
    @Length(7, 255)
    name: string;

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
        description: 'email',
        uniqueItems: true,
        required: true,
        minLength: 7,
        maxLength: 255,
    })
    @IsNotEmpty()
    @Length(7, 255)
    email: string;

    @ApiProperty({
        description: 'password',
        maxLength: 255,
    })
    @IsOptional()
    password: string;

    @ApiProperty({
        description: 'active',
        required: true,
    })
    @IsNotEmpty()
    active: boolean;

    @ApiProperty({
        description: 'phone',
    })
    @IsOptional()
    @Validate(IsPhoneCustom)
    phone: string;

    @ApiProperty({
        description: 'dateOfBirth',
        type: Date,
    })
    @IsOptional()
    dateOfBirth: Date;

    @ApiProperty({
        description: 'gender',
    })
    @IsOptional()
    gender: number;

    @ApiProperty({
        description: 'address',
    })
    @IsOptional()
    address: string;

    @ApiProperty({
        description: 'district',
    })
    @IsOptional()

    // @IsInt()

    zoneDistrict: number;

    @ApiProperty({
        description: 'city',
    })
    @IsOptional()
    // @IsInt()
    zoneProvince: number;

    @ApiProperty({
        description: 'companyName',
    })
    @IsOptional()
    @IsString()
    companyName: string;

    @ApiProperty({
        description: 'taxIdNumber',
    })
    @IsOptional()
    @IsString()
    taxIdNumber: string;

    @ApiProperty({
        description: 'type',
    })
    @IsOptional()
    @IsString()
    type: number;
}
