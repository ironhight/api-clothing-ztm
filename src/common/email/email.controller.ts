import { Controller, Get, UseInterceptors } from '@nestjs/common';
// import { EmailService } from './email.service';
// import { EmailReportCronService } from '@common/email/services/emailReportCron.service';
// import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
// import { ResponseService } from '../../core/services/response.service';

@Controller('email')
// @UseInterceptors(CoreTransformInterceptor)
export class EmailController {
    // constructor(private readonly emailService: EmailReportCronService, private readonly response: ResponseService) {}

    // @Get('test-choi')
    // async getOne() {
    //     const email = await this.emailService.sendEmailReport();
    //     return this.response.detailSuccess(true);
    // }
}
