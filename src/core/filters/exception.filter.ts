import { BaseExceptionFilter } from '@nestjs/core';

import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ForbiddenException,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";
import { Response } from "express";
import { LogService } from '@common/log/services/log.service';
import { ConfigService } from '@nestjs/config';
import { TranslateI18nService } from '@core/services/translateI18n.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(
        private readonly logService: LogService,
        private readonly config: ConfigService,
        private readonly translateService: TranslateI18nService
    ) {
        super();
    }

    async catch(exception: RuntimeException | HttpException, host: ArgumentsHost): Promise<any> {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse<Response>();

        // Log into DB
        this.logService.create(request, exception.stack, response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);

        if (exception instanceof BadRequestException) {
            let messages = await this.translateService.translateMessages(exception['response']['message'], request.locale);
            const statusCode = HttpStatus.BAD_REQUEST;
            response.status(statusCode).json({
                status: false,
                statusCode: statusCode,
                message: messages
            });
        } else if (['CastError', 'ValidationError'].includes(exception.constructor.name)) {
            const statusCode = HttpStatus.BAD_REQUEST;
            response.status(statusCode).json({
                status: false,
                statusCode: statusCode,
                message: exception['message'].split('.,').map(msg => msg.split(':').slice(-1)[0].replace(/(`|Path)/g, '').trim()),
            });
        } else if (exception instanceof ForbiddenException) {
            const statusCode = HttpStatus.FORBIDDEN;
            response.status(statusCode).json({
                status: false,
                statusCode: statusCode,
                message: await this.translateService.translateMessages('Permission denied!', request.locale)
            });
        } else if (exception instanceof HttpException) {
            const statusCode = exception.getStatus();
            response.status(statusCode).json(exception.getResponse());
        } else if (exception.constructor.name == 'TokenExpiredError') {
            const statusCode = 401;
            response.status(statusCode).json({
                status: false,
                statusCode: statusCode,
                message: await this.translateService.translateMessages('Token is expired', request.locale),
            });
        } else {
            let message = 'Internal server error';
            //error mongoose unique
            if ((exception['code'] || '') == 11000 && typeof exception['errmsg'] != 'undefined') {
                message = exception['errmsg'].substring(exception['errmsg'].indexOf('index: ') + 7, exception['errmsg'].indexOf('_1')) + ' must be unique'
            }
            const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response.status(statusCode).json({
                status: false,
                statusCode: statusCode,
                message: message,
                errors: this.config.get('node.env') == "production" ? '' :  (exception as RuntimeException).stack
            });
        }
    }
}