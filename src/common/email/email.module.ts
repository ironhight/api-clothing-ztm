import {forwardRef, HttpModule, Module} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CustomerModule } from '../customers/customer.module';
import { EntityModule } from '@entities/entity.module';
import { EmailReportCronService } from './services/emailReportCron.service';

@Module({
  imports: [
      forwardRef(() => CustomerModule),
      HttpModule,
      EntityModule,
      MailerModule.forRootAsync({
        imports: [ConfigService],
        inject: [ConfigService],
        useFactory: (configServie: ConfigService) => ({
          transport: {
            host: configServie.get("mailer.host"),
            port: configServie.get("mailer.port"),
            secure: true, // true for 465, false for other ports
            auth: {
              user: configServie.get("mailer.user"), // generated ethereal user
              pass: configServie.get("mailer.pass") // generated ethereal password
            },
          },
          defaults: {
            from: '"Digitop" <postmaster@mg.digitop.vn>', // outgoing email ID
          },
          template: {
            dir: process.cwd() + '/src/core/templates/',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
              strict: true,
            },
          },
        }),
      })
  ],
  providers: [EmailService, EmailReportCronService],
  controllers: [EmailController],
  exports: [EmailService]
})
export class EmailModule {}
