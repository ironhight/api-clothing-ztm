import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class BeZoneDistrictDto {
    @ApiProperty({
        description: 'zoneProvince',
        required: true
    })
    @IsNotEmpty()
    zoneProvince: number;

    @ApiProperty({
        description: 'code',
        nullable: true
    })
    @IsOptional()
    code: string;

    @ApiProperty({
        description: 'active',
        required: true,
    })
    @IsNotEmpty()
    active: boolean;

    @ApiProperty({
        description: 'translations',
        required: true,
    })
    @IsNotEmpty()
    translations: Array<Object>;

    @ApiProperty({
        description: 'lat',
        nullable: true
    })
    @IsOptional()
    lat: number;

    @ApiProperty({
        description: 'lng',
        nullable: true
    })
    @IsOptional()
    lng: number;

    @ApiProperty({
        description: 'sortOrder',
        required: true
    })
    @IsNotEmpty()
    sortOrder: number;
}
