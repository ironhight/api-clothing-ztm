import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginSocialDto {
    @IsNotEmpty({ message: 'Mã là bắt buộc' })
    accessToken: string;

    @IsOptional()
    forceLogin: boolean;
}
