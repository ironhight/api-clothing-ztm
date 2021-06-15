export enum promotionType {
    PRICE = 1,
    PERCENT = 2,
}

export function promotionTypeTrans(status = 1): string {
    return {
        1: 'Price',
        2: 'Percent',
    }[status];
}
