import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { randStr } from '@core/helpers/file';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
const path = require('path');

const prefix_upload_tmp = process.env.PREFIX_UPLOAD_TMP || 'storage/tmp';
// Multer configuration
export const multerConfig = {
    dest: prefix_upload_tmp,
};

// Multer upload options
export const multerOptions = {
    // Enable file size limits
    limits: {
        fileSize: +50000000000000000, // 50 millions GB
    },
    // Check the mimetypes to allow for upload
    fileFilter: (req: Request, file: Record<any, any>, cb: (result, isValid) => void): void => {
        if (file.mimetype.match(/(jpg|jpeg|png|gif|plain|msword|document|ms-excel|sheet|ms-powerpoint|presentation|csv|mpeg|mp4)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException({
                status: false,
                statusCode: 404,
                message: `Unsupported file type ${extname(file.originalname)}`,
            }, HttpStatus.BAD_REQUEST), false);
        }
    },
    // Storage properties
    storage: diskStorage({
        // Destination storage path details
        destination: (req, file, cb) => {
            const uploadPath = multerConfig.dest;
            // Create folder if doesn't exist
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        // File modification details
        filename: (req, file, cb) => {
            // Calling the callback passing the random name generated with the original extension name
            const timestamp = Date.now();
            const baseExt = extname(file.originalname);
            const baseName = path.basename(file.originalname, baseExt);
            // const newName = baseName.toLowerCase().replace(/(\ |-|_)+/g, "") + `${randStr(4)}${timestamp}`;
            const newName = `${randStr(12)}${timestamp}`;
            cb(null, `${newName}${baseExt}`);
        },
    }),
};

export function singleField(field: string): Type<NestInterceptor> {
    return FileInterceptor(field, multerOptions);
}

export function multiField(fields: MulterField[]): Type<NestInterceptor> {
    return FileFieldsInterceptor(fields, multerOptions);
}

export function anyField(): Type<NestInterceptor> {
    return AnyFilesInterceptor(multerOptions);
}