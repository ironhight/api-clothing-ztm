import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'Email',
    required: true
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    required: true
  })
  @IsNotEmpty()
  password: string;
}
