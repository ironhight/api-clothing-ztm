import { Injectable, Request, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '@core/services/helper.service';
import { UserService } from "@src/common/users/services/user.service";
import { BlacklistService} from '@common/auth/blacklist/services/blacklist.service';
import { UserLoginDto } from "@src/common/auth/user/dto/user.login.dto";
import { GuardEnum } from '@core/constants/guard.enum';
import { TokenBlacklist } from '@entities/tokenBlacklist.entity';
import { User } from '@entities/user.entity';
@Injectable()
export class UserAuthService {
    constructor(
        private blacklistService: BlacklistService,
        private userService: UserService,
        private helperService: HelperService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async findOne(query: Record<string, any>): Promise<TokenBlacklist> {
        return this.blacklistService.findOne(query);
    }

    async firstAdmin(): Promise<User> {
        return this.userService.firstAdmin();
    }

    async findOneUser(query: Record<string, any>, options?: Record<string, any>): Promise<User> {
        return this.userService.findOne(query, options);
    }

    async login(dto: UserLoginDto): Promise<any> {
        let user = await this.userService.findOne({ email: dto.email, active: true }, { relations: ['role'] });
        if(!user) return false;

        let comparedPassword = await this.helperService.compareHash(dto.password, user.password);
        if(!comparedPassword) return false;

        let expireAtArr = this.configService.get('jwtUser.options.expiresIn').split(/(\d+)/).filter(Boolean);
        let expireAt = this.helperService.addDateTime(expireAtArr[0], expireAtArr[1]);
        let token = this.jwtService.sign({ id: user.id, guard: GuardEnum.USER, expireAt: expireAt });
        token = this.helperService.encryptText(token);
        user.token = token;
        return user;
    }

    async logout(@Request() req: Record<string, any>): Promise<TokenBlacklist> {
        return this.blacklistService.create({ token: req.tokenAuth, guard: req.guardAuth, expireAt: req.expireAtAuth });
    }

    async getProfile(id: number): Promise<User> {
        return this.userService.detail(id);
    }

    async updateProfile(id: number, data: Object, files: Record<any, any>): Promise<any> {
        let compared_result = true;
        let user = await this.userService.detail(id);
        if(typeof data['password'] != 'undefined') compared_result = await this.helperService.compareHash(data['currentPassword'] || null, user.password);
        if(!compared_result) return this.helperService.throwException('Mật khẩu không đúng!', HttpStatus.UNPROCESSABLE_ENTITY);
        return this.userService.update(id, data, files);
    }
}
