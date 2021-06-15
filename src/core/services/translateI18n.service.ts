import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TranslateI18nService {

    constructor(private configService: ConfigService, private readonly i18n: I18nService) {}

    async translateMessages(validatorMsgs, locale): Promise<Array<string>|string> {
        var self = this;
        let messages = [];
        let isArray = true;
        if(!Array.isArray(validatorMsgs)) {
            validatorMsgs = [validatorMsgs];
            isArray = false;
        }
        await Promise.all(validatorMsgs.map(async function(msg) {
            if(msg[0] == '|') {
                let msgI18n = msg.split('|');
                let args = {};
                if(msgI18n[2]) {
                    await Promise.all(msgI18n[2].split(';').map(async function(arg) {
                        arg = arg.split(':');
                        return args[arg[0]] = arg[1].split('.').length <= 1 
                                                    ? arg[1] 
                                                    : await self.i18n.translate(`${arg[1]}`, {lang: locale});
                    }));
                }
                msgI18n = await self.i18n.translate(`${msgI18n[1]}`, {
                    lang: locale,
                    args: args,
                });
                msg = msgI18n;
            }
            messages.push(msg);
        }));

        return isArray ? messages : messages.join('');
    }
}
