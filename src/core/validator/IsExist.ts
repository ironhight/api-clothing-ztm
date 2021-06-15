import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({async: true})
export class IsExistConstraint implements ValidatorConstraintInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(id: string, args: ValidationArguments): boolean {
        return true;
    }
}

export function IsExist(constraints: string[], validationOptions?: ValidationOptions) {
    return (object: Record<any, any>, propertyName: string): any => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: constraints,
            validator: IsExistConstraint,
        });
    };
}