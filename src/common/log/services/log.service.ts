import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '@entities/log.entity';
const moment = require('moment');
@Injectable()
export class LogService {
    constructor(
        @InjectRepository(Log) private log: Repository<Log>,
    ) {}

    async create(request: Record<any, any>, errors?: string, statusCode?: number): Promise<Log> {
        let { ip, method, originalUrl } = request;
        let userAgent = request.get('user-agent') || '';
        return this.log.save({
            customer: request.user ? request.user.id : null,
            statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            ip: ip,
            method: method,
            url: originalUrl,
            userAgent: userAgent,
            detail: errors,
            expireAt: moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss')
        });
    }
}
