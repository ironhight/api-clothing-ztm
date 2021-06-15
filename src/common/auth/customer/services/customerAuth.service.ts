import { Injectable, Request, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '@core/services/helper.service';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { BlacklistService } from '@common/auth/blacklist/services/blacklist.service';
import { CustomerService } from '@common/customers/services/customer.service';
import { TokenBlacklist } from '@entities/tokenBlacklist.entity';
import { GuardEnum } from '@core/constants/guard.enum';
import { Customer } from '@entities/customer.entity';
import { IsNull, Not } from 'typeorm';
import { LoginSocialDto } from '../dto/customer.loginSocial.dto';
import { AuthTypeEnum } from '@core/constants/authType.enum';
import { FbGraphService } from '@core/services/fbGraph.service';
import { GoogleApiService } from '@core/services/googleApi.service';
import { CustomerRegisterDto } from '../dto/customer.register.dto';
import { randStr } from '@core/helpers/file';
import * as moment from 'moment';
import { EmailService } from '@common/email/email.service';

@Injectable()
export class CustomerAuthService {
    private readonly statusCode: number;
    private readonly emailService: EmailService;
    private hostFe = this.configService.get('domainFe.host');

    constructor(
        private readonly blacklistService: BlacklistService,
        private readonly helperService: HelperService,
        private readonly configService: ConfigService,
        private readonly customersService: CustomerService,
        private readonly jwtService: JwtService,
        private readonly fbGraphService: FbGraphService,
        private readonly googleApiService: GoogleApiService,
    ) {
        this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    }

    async findOne(query: Record<string, any>): Promise<TokenBlacklist> {
        return this.blacklistService.findOne(query);
    }

    async findOneCustomer(attributes: Record<string, any>): Promise<Customer> {
        return this.customersService.findOne(attributes);
    }

    async login(dto: CustomerLoginDto): Promise<any> {
        const user = await this.customersService.findOne({ email: dto.email, active: true });
        if (!user) return false;

        const comparedPassword = await this.helperService.compareHash(dto.password, user.password);
        if (!comparedPassword) return false;

        user.token = this.signToken(user.id).token;
        return user;
    }

    async create(data: CustomerRegisterDto, files?: Record<any, any>): Promise<Customer | HttpException> {
        const { email, phone } = data;

        await this.validationCustomer(email, phone);

        if (data.inviteCode) {
            const affiliateId = await this.checkInviteCode(data);
            if (affiliateId) data['affiliateId'] = affiliateId;
        }

        return await this.customersService.create(data, files);
    }

    async validationCustomer(email: string, phone: string) {
        const isUniqueEmail = await this.customersService.findOne({ email, active: true });
        if (isUniqueEmail) return this.helperService.throwException('Email đã được đăng ký', this.statusCode);
    }

    async logout(@Request() req: Record<string, any>): Promise<TokenBlacklist> {
        return this.blacklistService.create({
            token: req.tokenAuth,
            guard: req.guardAuth,
            expireAt: req.expireAtAuth,
        });
    }

    async getProfile(id: number) {
        const customer = await this.customersService.findOneCustomer(id);
        return customer;
    }

    async updateProfile(id: number, data: Record<string, any>, files: Record<any, any>): Promise<any> {
        let compared_result = true;

        const user = await this.customersService.findOne({ id, active: true });
        if (!user) {
            return this.helperService.throwException('Không tồn tại người dùng', this.statusCode);
        }

        const { email, phone } = data;
        await this.validationUpdateCustomer(email, phone, id);

        if (typeof data['password'] != 'undefined') compared_result = await this.helperService.compareHash(data['currentPassword'] || null, user.password);

        if (!compared_result) return this.helperService.throwException('Mật khẩu không đúng!', HttpStatus.UNPROCESSABLE_ENTITY);

        return this.customersService.update(id, data, files);
    }

    async validationUpdateCustomer(email: string, phone: string, id: number) {
        const isUniqueEmail = await this.customersService.findOne({
            where: { email, active: true, id: Not(id) },
        });
        if (isUniqueEmail) {
            return this.helperService.throwException('Đã tồn tại email trong hệ thống', this.statusCode);
        }

        const isUniquePhone = await this.customersService.findOne({
            where: { phone, active: true, id: Not(id) },
        });
        if (isUniquePhone) {
            return this.helperService.throwException('Đã tồn tại số điện thoại trong hệ thống', this.statusCode);
        }
    }

    async loginSocial(data: LoginSocialDto, socialType: string): Promise<Record<string, any>> {
        if (!Object.values(AuthTypeEnum).includes(socialType as AuthTypeEnum)) {
            this.helperService.throwException('Phương thức đăng nhập không hỗ trợ', 406);
        }

        let socialRes: {
            status: boolean;
            data?: { id: string; name: string; nameNon: string; email: string; picture: string };
        };

        if (socialType === AuthTypeEnum.FACEBOOK) socialRes = await this.fbGraphService.getProfile(data.accessToken);

        if (socialType === AuthTypeEnum.GOOGLE) socialRes = await this.googleApiService.getProfile(data.accessToken);

        if (!socialRes.status) return this.helperService.throwException('Không thể đăng nhập!', this.statusCode);

        let socialProfile = socialRes.data;
        let customer: Customer;

        customer = await this.customersService.findOne({
            where: {
                email: socialProfile.email || IsNull(),
                registerSource: socialType,
                profileId: socialProfile.id,
            },
        });

        if (!customer) {
            customer = await this.customersService.create({
                name: socialProfile.name,
                email: socialProfile.email,
                profileImage: socialProfile.picture,
                profileId: socialProfile.id,
                registerSource: socialType,
            });
        }
        return { ...customer, ...this.signToken(customer.id) };
    }

    async changePassword(data: Record<string, any>, customer: Customer) {
        const comparedPassword = await this.helperService.compareHash(data.oldPassword, customer.password);
        if (!comparedPassword) this.helperService.throwException('Old password wrong', 406);

        return await this.customersService.changePassword(data, customer);
    }

    async forgotPassword(data: { email: string }): Promise<any> {
        const customer = await this.customersService.findOne({ email: data.email });
        if (!customer) this.helperService.throwException('Tài khoản không tồn tại!', 406);
        if (!customer.email) return this.helperService.throwException('Tài khoản này chưa có email!', 406);
        if (!customer.active || customer.deletedAt) return this.helperService.throwException('Tài khoản này đã bị khóa!', 406);

        const resetCode = randStr();
        const expireResetCode = moment()
            .add(5, 'm')
            .format('YYYY-MM-DD HH:mm:ss');
        const result = await this.customersService.update(customer.id, {
            resetCode: resetCode,
            expireResetCode: expireResetCode,
            active: true,
            deletedAt: null,
        });

        if (!result) return false;

        await this.emailService.sendForgotPassword({
            code: resetCode,
            email: customer.email,
            name: customer.name,
        });
        return true;
    }

    private signToken(id: number) {
        const expireAtArr = this.configService
            .get('jwtCustomer.options.expiresIn')
            .split(/(\d+)/)
            .filter(Boolean);

        const expireAt = this.helperService.addDateTime(expireAtArr[0], expireAtArr[1]);

        const token = this.jwtService.sign({
            id,
            guard: GuardEnum.CUSTOMER,
            expireAt,
        });

        return { token: this.helperService.encryptText(token), expireAt };
    }

    async generateInviteCode(customer: Customer) {
        const inviteCode = `${customer.id}C${randStr()}`;
        const expireInviteCode = moment()
            .add(7, 'd')
            .format('YYYY-MM-DD HH:mm:ss');

        await this.customersService.update(customer.id, {
            inviteCode,
            expireInviteCode,
        });

        return `${this.hostFe}/affiliate?code=${inviteCode}`;
    }

    async checkInviteCode(data: Record<string, any>) {
        const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const customer = await this.findOneCustomer({ where: { inviteCode: data.inviteCode, active: true } });
        if (!customer) this.helperService.throwException('Customer not found', 406);

        if (customer.expireInviteCode < now) this.helperService.throwException('This code has expired', 406);

        return customer.id;
    }
}
