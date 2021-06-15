export enum statusSchedulerMessage {
    SEND_SMS_ERROR = 0,
    SEND_SMS_WAITING = 1,
    SEND_SMS_SUCCESS = 2,
    SEND_EMAIL_SUCCESS = 3,
}

export function statusSchedulerMessageTrans(status = 1): string {
    return {
        0: 'Send SMS error',
        1: 'Send SMS waiting',
        2: 'Send SMS success',
        3: 'Send Email success',
    }[status];
}
