import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GuardEnum } from "@core/constants/guard.enum";
import { CustomerAuthService } from "@src/common/auth/customer/services/customerAuth.service";
import { HelperService } from "@core/services/helper.service";
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtCustomerMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private authService: CustomerAuthService,
        private helperService: HelperService,
		private configService: ConfigService,
    ) {
    }

    async use(req: Record<string, any>, res: Record<string, any>, next: () => void): Promise<any> {
        /*
            Normal user mode -> Check Auth
         */
        let encryptedToken = req.header('Authorization') ? (req.header('Authorization').split(" "))[1] : null;
        if(!encryptedToken) return this.helperService.throwException('Token is missing', HttpStatus.FORBIDDEN);

        let token = this.helperService.decryptText(encryptedToken);
        if (!token) return this.helperService.throwException('Token is expired', HttpStatus.FORBIDDEN);

        let tokenBlacklist = await this.authService.findOne({ token: token, guard: GuardEnum.CUSTOMER });
        if (tokenBlacklist) return this.helperService.throwException('Token is expired', HttpStatus.FORBIDDEN);

        let payload = await this.jwtService.verify(token, {
            secret: this.configService.get('jwtCustomer.secretKey'),
        });

        if(payload.guard != GuardEnum.CUSTOMER) return this.helperService.throwException('Token is invalid', HttpStatus.FORBIDDEN);

        let user = await this.authService.findOneCustomer({ id: payload.id, active: true });
        if(!user) return this.helperService.throwException('User is not exist or inactive', HttpStatus.FORBIDDEN);
        req.user = user;
        req.user.id = req.user.id.toString();
        req.guardAuth = payload.guard;
        req.expireAtAuth = payload.expireAt;
        req.tokenAuth = token;
        return next();
    }
}
