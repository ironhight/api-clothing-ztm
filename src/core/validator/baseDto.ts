import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export abstract class BaseDto {
    @ApiProperty({
        description: 'sortOrder',
    })
    @IsOptional()
    sortOrder: number;
}