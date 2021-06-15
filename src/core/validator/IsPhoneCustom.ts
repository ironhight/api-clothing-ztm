import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPhoneCustom', async: false })
export class IsPhoneCustom implements ValidatorConstraintInterface {
    private isPhoneNumber(phone: string) {
        let re = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
        return re.test(String(phone).toLowerCase());
    }

    validate(text: string, args: ValidationArguments) {
        return this.isPhoneNumber(text);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid phone';
    }
}
