import { Injectable } from '@nestjs/common';
import * as client from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export class SendSmsService {
    constructor() {}

    async twilioSms(
        accountSid: string,
        authToken: string,
        messagingServiceSid: string,
        body: string,
        to: string,
    ): Promise<MessageInstance> {
        const rs: any = await client(accountSid, authToken)
            .messages.create({ body, messagingServiceSid, to })
            .catch((err) => {
                console.error(err);
            });

        return rs;
    }
}
