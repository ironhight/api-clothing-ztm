import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailReportCronService } from '@common/email/services/emailReportCron.service';

@Injectable()
export class EmailReportScheduleService {
    constructor(private emailReportCronService: EmailReportCronService) {}

    @Cron('59 23 * * 0', {
        name: 'sendEmailReport',
    })
    async handleSendEmailReportCron() {
        console.log('Task Schedule: sendEmailReport');
        await this.emailReportCronService.sendEmailReport();
    }
}
