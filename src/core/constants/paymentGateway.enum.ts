export enum OrderStatusEnum {
    CANCEL = 0,
    NEW = 1,
    WAIT_TO_PAY = 2,
    PROCESSING = 3,
    SHIPPING = 4,
    COMPLETED = 5,
}

export function OrderStatusEnumTranPayOnlineString(status = 'New'): number {
    return {
        New: 1,
        'Wait to pay': 2,
        Processing: 3,
        Shipping: 4,
        Completed: 5,
        Cancel: 0,
    }[status];
}

export function OrderStatusEnumTranPayOnline(status = 1): string {
    return {
        1: 'New',
        2: 'Wait to pay',
        3: 'Processing',
        4: 'Shipping',
        5: 'Completed',
        0: 'Cancel',
    }[status];
}

export enum PaymentGatewayEnum {
    CODE = 'code',
    MOMO = 'momo',
    PAYPAL = 'paypal',
    STRIPE = 'stripe',
    VNPAY = 'vnpay',
    ZALOPAY = 'zalopay',
}

export enum PaymentCurrencyEnum {
    USD = 'USD',
    VND = 'VND',
}

export enum PaymentCodeEnum {
    MOMO_SUCCESS = 0,
    MOMO_PAID = 0,
    MOMO_INVALID_ORDER = 2,
    MOMO_INVALID_SIGN = 5,
    MOMO_ERROR_UPDATE = 8,
    MOMO_EXCEPTION_ERROR = 99,

    ZALO_PAID = 1,
    ZALO_SUCCCESS = 1,
    ZALO_INVALID_CALLBACK = -1,
    ZALO_ERROR_UPDATE = 5,
    ZALO_EXCEPTION_ERROR = 0,

    VNPAY_SUCCESS = '00',
    VNPAY_ERROR_UPDATE = '95',
    VNPAY_INVALID_CALLBACK = '96',
    VNPAY_INVALID_SIGN = '97',
    VNPAY_EXCEPTION_ERROR = '98',

    PAYPAL_CREATED = 'created',
    PAYPAL_APPROVED = 'approved',
    PAYPAL_FAILED = 'failed',
    PAYPAL_CANCEL = 49,
    PAYPAL_INVALID_CALLBACK = 11813,
    PAYPAL_ERROR_UPDATE = 5,
    PAYPAL_SUCCCESS = 0,
    PAYPAL_EXCEPTION_ERROR = 99,
}

export interface OrderInterface {
    id: number;
    gateway: string;
    status: number;
    orderId: string;
    requestId: string;
    title: string;
    description: string;
    total: number;
    subtotal: number;
    discount: number;
    shipping: number;
    shippingDiscount: number;
    tax: number;
    shippingAddress: {
        recipient_name: string;
        line1: string;
        line2: string;
        city: string;
        country_code: string;
        postal_code: string;
        state: string;
        phone: string;
        email: string;
    };
    items: Array<OrderDetailInterface>;
    customer?: any;
    amount?: any;
    package?: any;
}
export interface OrderDetailInterface {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    tax: number;
}

export interface PaymentResponseInterface {
    status: boolean;
    message: string;
    data: any;
    redirectUrl?: string;
    error?: any;
    return_code?: number;
    return_message?: string;
    statusCode?: number | string;
}

export interface RequestMomoInterface {
    id: number;
    orderId: string;
    requestId: string;
    title: string;
    amount: string;
    extraData: string;
}
export interface DetailMomoInterface {
    requestId: string;
    orderId: string;
}
export interface CallbackMomoInterface {
    partnerCode: string;
    accessKey: string;
    requestId: string;
    amount: string;
    orderId: string;
    orderInfo: string;
    orderType: string;
    transId: string;
    errorCode: string;
    message: string;
    localMessage: string;
    responseTime: string;
    signature: string;
    extraData: string;
    payType: string;
}

export interface RequestZaloInterface {
    id: number;
    app_trans_id: string;
    title: string;
    description: string;
    amount: number;
    phone: string;
    email: string;
    address: string;
    item: Array<RequestItemZaloInterface>;
}
export interface RequestItemZaloInterface {
    itemid: string;
    itename: string;
    itemprice: number;
    itemquantity: number;
}
export interface CallbackZaloInterface {
    data: CallbackDataZaloInterface;
    mac: string;
    type: string;
}
export interface CallbackDataZaloInterface {
    app_id: number;
    app_trans_id: string;
    app_time: number;
    app_user: string;
    amount: number;
    embed_data: string;
    item: string;
    zp_trans_id: number;
    server_time: number;
    channel: number;
    merchant_user_id: string;
    user_fee_amount: number;
    discount_amount: number;
}
export interface DetailZaloInterface {
    app_trans_id: string;
}
export interface RefundZaloInterface {
    id: string;
    zp_trans_id: string;
    amount: number;
    description: string;
}
export interface DetailRefundZaloInterface {
    m_refund_id: string;
    zp_trans_id: string;
    amount: number;
    description: string;
}

export interface RequestVnpayInterface {
    id: number;
    vnp_TxnRef: string;
    vnp_Amount: number;
    vnp_CreateDate: string;
    vnp_IpAddr: string;
    vnp_OrderInfo: string;
}

export interface CallbackVnpayInterface {
    vnp_TmnCode: string;
    vnp_Amount: number;
    vnp_BankCode: string;
    vnp_BankTranNo: string;
    vnp_CardType: string;
    vnp_PayDate: number;
    vnp_OrderInfo: string;
    vnp_TransactionNo: number;
    vnp_ResponseCode: number;
    vnp_TxnRef: string;
    vnp_SecureHashType: string;
    vnp_SecureHash: string;
}

export interface RequestPaypalInterface {
    options: {
        orderId: number;
        excutePaypal: number;
    };
    amount: {
        currency: string;
        total: string;
        details: {
            shipping: string;
            subtotal: string;
            shipping_discount: string;
            insurance: string;
            handling_fee: string;
            tax: string;
        };
    };
    description: string;
    item_list: {
        shipping_address: {
            recipient_name: string;
            line1: string;
            line2: string;
            city: string;
            country_code: string;
            postal_code: string;
            state: string;
            phone: string;
        };
        items: Array<RequestItemPaypalInterface>;
    };
}
export interface RequestItemPaypalInterface {
    name: string;
    description: string;
    quantity: string;
    price: string;
    tax: string;
    sku: string;
    currency: string;
}
export interface CallbackPaypalInterface {
    paymentId: string;
    PayerID: string;
    orderId: number;
}
export interface RefundFullPaypalInterface {
    saleId: string;
}
export interface RefundPartialPaypalInterface {
    saleId: string;
    amount: {
        total: string;
        currency: string;
    };
    invoice_number: string;
    description: string;
}
export interface DetailPaypalInterface {
    paymentId: string;
}
export interface DetailSalePaypalInterface {
    saleId: string;
}
