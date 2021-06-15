export enum OrderStatus {
    CANCEL = 1,
    PLACE_ORDER = 2,
    PROCESSING = 3,
    DELIVERING = 4,
    DELIVERED = 5,
}

export function OrderStatusTrans(status = 1): string {
    return {
        1: 'Cannel',
        2: 'Place order',
        3: 'Processing',
        4: 'Delivering',
        5: 'Delivered',
    }[status];
}
