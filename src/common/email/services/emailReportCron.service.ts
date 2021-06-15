import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email.service';

@Injectable()
export class EmailReportCronService {
    constructor(
        private emailService: EmailService,
    ) {}

    async sendEmailReport() {

    }
}
