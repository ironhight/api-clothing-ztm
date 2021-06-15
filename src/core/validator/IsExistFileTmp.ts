import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { isArray } from 'util';
import * as helperFile from '@core/helpers/file';

@ValidatorConstraint({ async: true })
export class IsExistFileTmpConstraint implements ValidatorConstraintInterface {
    async validate(value: Record<any, any> | string): Promise<boolean> {
        if (value == 'null' || isArray(value)) {
            return true;
        } else {
            const file_tmp = `${process.env.PREFIX_UPLOAD_TMP}/${value}`;
            return await helperFile.existFileLocal(file_tmp);
        }
    }
}

export function IsExistFileTmp(constraints: string[], validationOptions?: ValidationOptions) {
    return function(object: Record<any, any>, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: constraints,
            validator: IsExistFileTmpConstraint,
        });
    };
}