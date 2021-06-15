import { Module } from '@nestjs/common';
import { UserAuthModule } from "@common/auth/user/userAuth.module";
import { CustomerAuthModule } from "@common/auth/customer/customerAuth.module";
@Module({
    imports: [
        UserAuthModule,
        CustomerAuthModule,
    ],
    exports: [
        UserAuthModule,
        CustomerAuthModule,
    ]
})
export class AuthModule {
}
