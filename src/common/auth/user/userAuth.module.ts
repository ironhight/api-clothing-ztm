import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserAuthService } from "@src/common/auth/user/services/userAuth.service";
import { AuthController } from "@src/common/auth/user/auth.controller";
import { UserModule } from "@src/common/users/user.module";
import { BlacklistModule } from '@common/auth/blacklist/blacklist.module';
@Module({
    imports: [
        BlacklistModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get('jwtUser.secretKey');
                const expiresIn = configService.get('jwtUser.options.expiresIn');
                return {
                    secret,
                    signOptions: {expiresIn},
                    verifyOptions: {
                        ignoreNotBefore: true,
                    }
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [UserAuthService],
    controllers: [AuthController],
    exports: [
        JwtModule,
        UserAuthService
    ]
})
export class UserAuthModule {
}
