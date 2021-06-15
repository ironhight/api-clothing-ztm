import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Languages } from '@entities/utils/multiLanguageProp';

@ValidatorConstraint({ async: true })
export class IsValidTransConstraint implements ValidatorConstraintInterface {
    validate(value: Record<any, any> | string, args: ValidationArguments): boolean {
        return validationRule(args)
    }

    defaultMessage(args: ValidationArguments): string {
        return validationRule(args, true);
    }
}

export function IsValidTrans(constraints: string[], validationOptions?: ValidationOptions) {
    return function(object: Record<any, any>, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: constraints,
            validator: IsValidTransConstraint,
        });
    };
}

const validationRule = function(args: ValidationArguments, isMsg = false): any {
    let langs = Languages;
    let result:any = true;
    let value = args.value;
    let propName = args.property;
    let validations = {};
    let constraints = args.constraints;
    let transFile = 'validation.attributes.';
    if(constraints && constraints.length) {
        constraints.forEach(function(constraint) {
            let [name, rule, value] = constraint.split(':');
            if(name == 'transFile') {
                transFile = `${rule}.`;
            } else if(langs.indexOf(name) != -1) {
                validations[name] = validations[name] || {};
                validations[name][rule] = value;
            } else {
                langs.forEach(function(lang) {
                    validations[lang] = validations[lang] || {};
                    validations[lang][name] = rule;
                });
            }
        });
    } else {
        langs.forEach(function(lang) {
            validations[lang] = {
                required: 'true',
                maxlength: '255',
            }
        });
    }

    if(!value) {
        return isMsg ? `|validation.required|attribute:${transFile}${propName}` : false;
    }

    langs.forEach(function(lang) {
        if(typeof value[lang] == 'undefined') {
            result = isMsg ? `|validation.required|attribute:${transFile}${propName};lang:(${lang})` : false;
        } else if(typeof value[lang] != 'undefined' && !value[lang] && (validations[lang]['required'] == 'true') == true) {
            result = isMsg ? `|validation.required|attribute:${transFile}${propName};lang:(${lang})` : false;
        } else if(typeof value[lang] != 'undefined' && value[lang].length > (validations[lang]['maxlength'] || '255')) {
            result = isMsg ? `|validation.max.string|attribute:${transFile}${propName};lang:(${lang});max:${(validations[lang]['maxlength'] || '255')}` : false;
        }
    });

    return result;
};