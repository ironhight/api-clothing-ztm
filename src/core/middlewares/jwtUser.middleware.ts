import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GuardEnum } from '@core/constants/guard.enum';
import { UserAuthService } from "@src/common/auth/user/services/userAuth.service";
import { HelperService } from "@core/services/helper.service";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtUserMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private authService: UserAuthService,
        private helperService: HelperService,
        private configService: ConfigService,
    ) {}

    async use(req: Record<string, any>, res: Record<string, any>, next: () => void): Promise<any> {
        /*
        Super Admin Mode -> Auto authenticated with full permissions
         */
        if (this.configService.get('node.admin_mode')) {
            let expiredAtArr = this.configService.get('jwtUser.options.expiresIn').split(/(\d+)/).filter(Boolean);
            let expiredAt = this.helperService.addDateTime(expiredAtArr[0], expiredAtArr[1]);

            req.user = await this.authService.firstAdmin();
            req.user.id = req.user._id.toString();
            req.guardAuth = GuardEnum.USER;
            req.expireAtAuth = expiredAt;
            return next();
        }

        /*
            Normal user mode -> Check Auth
         */
        let encryptedToken = req.header('Authorization') ? (req.header('Authorization').split(" "))[1] : (req.query.token || null) ;
        if(!encryptedToken) return this.helperService.throwException('Token is missing', HttpStatus.FORBIDDEN);

        let token = this.helperService.decryptText(encryptedToken);
        if (!token) return this.helperService.throwException('Token is expired', HttpStatus.FORBIDDEN);

        let tokenBlacklist = await this.authService.findOne({ token: token, guard: GuardEnum.USER });
        if (tokenBlacklist) return this.helperService.throwException('Token is expired', HttpStatus.FORBIDDEN);

        let payload = await this.jwtService.verify(token);
        if(payload.guard != GuardEnum.USER) return this.helperService.throwException('Token is invalid', HttpStatus.FORBIDDEN);

        let user = await this.authService.findOneUser({ id: payload.id, active: true }, {relations: ['role']});
        if(!user) return this.helperService.throwException('User is not exist or inactive', HttpStatus.FORBIDDEN);

        req.user = user;
        req.user.id = req.user.id.toString();
        req.guardAuth = payload.guard;
        req.expireAtAuth = payload.expireAt;
        req.tokenAuth = token;
        return next();
    }
}
