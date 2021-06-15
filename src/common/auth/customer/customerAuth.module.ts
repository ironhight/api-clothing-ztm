import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from "@src/common/customers/customer.module";
import {  ConfigService } from "@nestjs/config";
import { CustomerAuthService } from "@src/common/auth/customer/services/customerAuth.service";
import { AuthController } from "@src/common/auth/customer/auth.controller";
import { BlacklistModule } from '@common/auth/blacklist/blacklist.module';
@Module({
    imports: [
        BlacklistModule,
        CustomerModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get('jwtCustomer.secretKey');
                const expiresIn = configService.get('jwtCustomer.options.expiresIn');
                return {
                    secret,
                    signOptions: { expiresIn },
                }
            },
            inject: [ConfigService],
        }),
    ],
    providers: [CustomerAuthService],
    controllers: [AuthController],
    exports: [
        JwtModule,
        CustomerAuthService
    ]
})
export class CustomerAuthModule {
}
