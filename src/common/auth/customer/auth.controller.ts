import { Body, Controller, Get, Post, Put, Request, UseInterceptors, UploadedFiles, Param, Header, Query, applyDecorators } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { CustomerAuthService } from '@src/common/auth/customer/services/customerAuth.service';
import { CustomerLoginDto } from '@src/common/auth/customer/dto/customer.login.dto';
import { TransformerCustomerService } from '@common/customers/services/transformerCustomer.service';
import { ResponseService } from '@core/services/response.service';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { CustomerAuth } from '@common/auth/customer/decorators/customer.decorator';
import { FeProfileDto } from '@common/customers/frontend/dto/feProfile.dto';
import { CustomerRegisterDto } from './dto/customer.register.dto';
import { LoginSocialDto } from './dto/customer.loginSocial.dto';
import { ChangePasswordCustomerDto } from './dto/customer.change-password.dto';
import { ForgotPasswordDto } from './dto/customer.forgot-password.dto';
import { Customer } from '@entities/customer.entity';

@ApiTags('Auth/Customer')
@Controller('auth/customers')
@UseInterceptors(CoreTransformInterceptor)
export class AuthController {
    constructor(
        private authService: CustomerAuthService, 
        private transformer: TransformerCustomerService, 
        private response: ResponseService
        ) {}

    @Post('login')
    async login(@Body() dto: CustomerLoginDto): Promise<CoreResponse> {
        const login = await this.authService.login(dto);
        if (!login) return this.response.credentialFail();
        
        return this.response.detailSuccess(this.transformer.transformCustomerDetail(login, { token: login.token }));
    }

    @Post('register')
    @Header('Content-Type', 'multipart/form-data')
    @HasFile()
    async create(@UploadedFiles() files: Record<any, any>, @Body() dto: CustomerRegisterDto): Promise<CoreResponse> {
        const item = await this.authService.create(dto, files);

        if (!item) return this.response.createdFail('Đăng ký người dùng thất bại');
        return this.response.createdSuccess(this.transformer.transformCustomerDetail(item));
    }

    @Post('login/:social')
    async loginSocial(@Body() dto: LoginSocialDto, @Param('social') social: string): Promise<CoreResponse> {
        let loginSocial = await this.authService.loginSocial(dto, social);

        if (!loginSocial) {
            return this.response.credentialFail('Thông tin đăng nhập không đúng!');
        }

        return this.response.detailSuccess(
            this.transformer.transformCustomerDetail(loginSocial, {
                token: loginSocial.token,
                tokenExpireAt: loginSocial.expireAt,
            }),
        );
    }

    @Post('logout')
    async logout(@Request() req: Record<string, any>): Promise<CoreResponse> {
        const logout = await this.authService.logout(req);
        if (!logout) return this.response.credentialFail();
        
        return this.response.detailSuccess({});
    }

    @Get('profiles')
    @ApiBearerAuth()
    async getProfile(@CustomerAuth() u: Record<string, any>): Promise<CoreResponse> {
        const item = await this.authService.getProfile(u.id);
        if (!item) return this.response.detailFail();

        return this.response.detailSuccess(this.transformer.transformCustomerDetail(item, item.ticket));
    }

    @Put('profiles')
    @HasFile()
    @ApiBearerAuth()
    async updateProfile(
        @UploadedFiles() files: Record<any, any>, 
        @Body() dto: FeProfileDto, 
        @CustomerAuth() user: Record<string, any>): Promise<CoreResponse> {
        const updateProfile = await this.authService.updateProfile(user.id, dto, files);
        if (!updateProfile) return this.response.updatedFail();
        
        return this.response.updatedSuccess(this.transformer.transformCustomerDetail(updateProfile));
    }

    @Put('change-password')
    @ApiBearerAuth()
    async changePassword(@Body() dto: ChangePasswordCustomerDto, @CustomerAuth() customer: Customer) {
        const item = await this.authService.changePassword(dto, customer);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess("Change password successfully");
    }

	@Post('forgot-password')
    async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<CoreResponse> {
        let forgotPassword = await this.authService.forgotPassword(dto)
        if(!forgotPassword) return this.response.detailFail('Thông tin sai!');
        return this.response.detailSuccess('Đã gửi mã code');
    }

    @Post('generate-invite-code')
    @ApiBearerAuth()
    async generateInviteCode(@CustomerAuth() customer: Customer) {
        const rs = await this.authService.generateInviteCode(customer)
        if(!rs) return this.response.createdFail()
        return this.response.createdSuccess(rs)
    }

    @Get('check-code-invite')
    @applyDecorators(ApiQuery({ required: true, name: 'code', description: 'code' }))
    async checkCodeInvite(@Query() query: Record<string, any>) {
        const rs = await this.authService.checkInviteCode(query)
        if(!rs) return  this.response.detailFail()
        return this.response.detailSuccess('SUCCESS')
    }
}
