import { Body, Controller, Get, Post, Put, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user.login.dto';
import { UserAuthService } from './services/userAuth.service';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { UserAuth } from '@common/auth/user/decorators/user.decorator';
import { ProfileDto } from '@src/common/users/admin/dto/profile.dto';
import { HasFile } from '@core/decorators/hasFile.decorator';
import { TransformerUserService } from '@common/users/services/transformerUser.service';
import { ResponseService } from '@core/services/response.service';
@ApiTags('Auth/User')
@Controller('auth/users')
@UseInterceptors(CoreTransformInterceptor)
export class AuthController {
    constructor(
        private authService: UserAuthService,
        private transformer: TransformerUserService,
        private response: ResponseService
    ) {}

    @Post('login')
    async login(@Body() dto: UserLoginDto): Promise<CoreResponse> {
        let login = await this.authService.login(dto);
        if(!login) return this.response.credentialFail();
        return this.response.detailSuccess(this.transformer.transformUserDetail(login, {token: login.token}));
    };

    @Post('logout')
    @ApiBearerAuth()
    async logout(@Request() req: Record<string, any>): Promise<CoreResponse> {
        let logout = await this.authService.logout(req);
        if(!logout) return this.response.credentialFail();
        return this.response.detailSuccess({});
    }

    @Get('profiles')
    @ApiBearerAuth()
    async getProfile(@UserAuth() u: any): Promise<CoreResponse> {
        let item = await this.authService.getProfile(u.id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformUserDetail(item));
    }

    @Put('profiles')
    @HasFile()
    @ApiBearerAuth()
    async updateProfile(@UploadedFiles() files: Record<any, any>, @Request() req: Record<string, any>,@Body() dto: ProfileDto, @UserAuth() user: any): Promise<CoreResponse> {
        let updateProfile = await this.authService.updateProfile(user.id, dto, files);
        if(!updateProfile) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformUserDetail(updateProfile));
    }
}
