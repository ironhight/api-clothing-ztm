import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPasswordDto {
    @ApiProperty({
        description: 'email',
    })
    @IsNotEmpty({ message: 'Email là bắt buộc!' })
    email: string;

    @ApiProperty({
        description: 'reCaptchaCode',
    })
    @IsNotEmpty({ message: 'reCaptchaCode là bắt buộc!' })
    reCaptchaCode: string;
}
