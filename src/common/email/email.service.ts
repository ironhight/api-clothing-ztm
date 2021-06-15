import { forwardRef, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { ExportService } from '@core/services/export.service';
import { CustomerService } from '../customers/services/customer.service';

@Injectable()
export class EmailService {
    constructor(
        @Inject(forwardRef(() => CustomerService)) private readonly customerService: CustomerService,
        private readonly mailerService: MailerService,
        private config: ConfigService,
        private httpService: HttpService,
        private exportService: ExportService,
    ) {}

    public async sendMail(
        mailto: string,
        subject: string,
        template = './index',
        data: Record<any, any>,
        isVerify: boolean,
    ): Promise<boolean> {
        if (isVerify) {
            const arrayEmail = mailto.split(',');
            for (const i in arrayEmail) {
                if (!(await this.verifyEmail(arrayEmail[i]))) {
                    return false;
                }
            }
        }

        const mailName = this.config.get('mailer.name');
        const mailFrom = this.config.get('mailer.user');
        await this.mailerService.sendMail({
            to: mailto,
            from: `"${mailName}" <${mailFrom}>`, // Senders email address
            subject: subject,
            template, // The `.pug` or `.hbs` extension is appended automatically.
            context: data,
        });
        return true;
    }

    public async sendMailWithAttachments(
        mailto: string,
        subject: string,
        template = 'index',
        data: Record<any, any>,
        isVerify: boolean,
    ): Promise<boolean> {
        const customers = await this.customerService.findAll({
            page: 1,
            limit: 1000,
            orderBy: 'id',
            order: 'DESC',
            sorts: {},
            hasPaginate: false,
            export: true,
            get: true,
        });

        const customerExcel = this.customerService.transformCustomerExport(customers);

        if (isVerify) {
            const arrayEmail = mailto.split(',');
            for (const i in arrayEmail) {
                if (!(await this.verifyEmail(arrayEmail[i]))) {
                    return false;
                }
            }
        }

        const mailName = this.config.get('mailer.name');
        const mailFrom = this.config.get('mailer.user');
        await this.mailerService.sendMail({
            to: mailto,
            from: `"${mailName}" <${mailFrom}>`, // Senders email address
            subject: subject,
            template, // The `.pug` or `.hbs` extension is appended automatically.
            context: data,
            attachments: [
                {
                    filename: `Report-customers-(${moment().format('DD-MM-YYYY')}).xlsx`,
                    content: this.exportService.toExcelBuffer(customerExcel),
                }
            ],
        });

        return true;
    }

    public async verifyEmail(email: string): Promise<boolean> {
        const key = this.config.get('mailer.verify_key');
        const result = await this.httpService
            .get<any>(`https://api.millionverifier.com/api/v3/?api=${key}&email=${email}`)
            .toPromise();
        return result.data.resultcode == 1;
    }

    public async sendForgotPassword(data: { code: number; email: string; name: string }) {
        return await this.sendMail(
            data.email,
            '[TB] Quên mật khẩu',
            './forgotPassword',
            {
                prefixUrl: process.env.NODE_URL,
                frontendUrl: process.env.FRONTEND_URL,
                cdnAdminUrl: process.env.NEXT_PUBLIC_CDN_BASE_PATH_ADMIN,
                name: data.name,
                code: data.code,
            },
            true,
        );
    }
}
