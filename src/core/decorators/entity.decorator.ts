import { Column, ColumnOptions, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { camelCaseToSnakeCase } from '../helpers/text';

export function DefColumn(options?: ColumnOptions) {
    return function(target: Record<string, any>, propertyKey: string): void {
        return mergeNameColumn(target, propertyKey, Column, options);
    };
}

export function DefCreateDateColumn(options?: ColumnOptions) {
    return function(target: Record<string, any>, propertyKey: string): void {
        return mergeNameColumn(target, propertyKey, CreateDateColumn, options);
    };
}
export function DefUpdateDateColumn(options?: ColumnOptions) {
    return function(target: Record<string, any>, propertyKey: string): void {
        return mergeNameColumn(target, propertyKey, UpdateDateColumn, options);
    };
}

export function DefDeleteDateColumn(options?: ColumnOptions) {
    return function(target: Record<string, any>, propertyKey: string): void {
        return mergeNameColumn(target, propertyKey, DeleteDateColumn, options);
    };
}

function mergeNameColumn(
    target: Record<string, any>,
    propertyKey: string,
    funDecorator: (options: ColumnOptions) => PropertyDecorator,
    options?: ColumnOptions,
) {
    if (options && options.name) {
        return funDecorator(options)(target, propertyKey);
    }
    return funDecorator({ ...options, name: camelCaseToSnakeCase(propertyKey) })(
        target,
        propertyKey,
    );
}
