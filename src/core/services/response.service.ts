import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MessageEnum } from '../constants/message.enum';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ResponseService {

    private locale: string;
    
    constructor(
        private configService: ConfigService,
        @Inject(REQUEST) private request: any
        ) {
        this.locale = request.locale;
    }

    credentialFail(message: string = MessageEnum[this.locale].FAILED): {} {
        return {
            status: false,
            statusCode: HttpStatus.UNAUTHORIZED,
            message: message
        }
    }

    detailFail(message: string = MessageEnum[this.locale].FIND_ONE_FAILED): {} {
        return {
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: message
        }
    }

    createdFail(message: string = MessageEnum[this.locale].CREATE_FAILED): {} {
        return {
            status: false,
            statusCode: HttpStatus.FAILED_DEPENDENCY,
            message: message
        }
    }

    updatedFail(message: string = MessageEnum[this.locale].UPDATE_FAILED): {} {
        return {
            status: false,
            statusCode: HttpStatus.FAILED_DEPENDENCY,
            message: message
        }
    }

    deletedFail(message: string = MessageEnum[this.locale].DELETE_FAILED): {} {
        return {
            status: false,
            statusCode: HttpStatus.FAILED_DEPENDENCY,
            message: message
        }
    }

    //

    detailSuccess(data): {} {
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: MessageEnum[this.locale].FIND_ONE_SUCCESS,
            data
        }
    }

    createdSuccess(data): {} {
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: MessageEnum[this.locale].CREATE_SUCCESS,
            data
        }
    }

    updatedSuccess(data): {} {
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: MessageEnum[this.locale].UPDATE_SUCCESS,
            data
        }
    }

    deletedSuccess(data = null): {} {
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: MessageEnum[this.locale].DELETE_SUCCESS,
            data
        }
    }

    fetchListSuccess(data = null): {} {
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: MessageEnum[this.locale].FIND_ALL_SUCCESS,
            data
        }
    }
}
