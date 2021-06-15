import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { HelperService } from './services/helper.service';
import { TranslateI18nService } from './services/translateI18n.service';
import { ResponseService } from './services/response.service';
import { PagingMiddleware } from './middlewares/paging.middleware';
import { JwtUserMiddleware } from '@core/middlewares/jwtUser.middleware';
import { JwtCustomerMiddleware } from '@core/middlewares/jwtCustomer.middleware';
import { LocaleMiddleware } from '@core/middlewares/locale.middleware';
//
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import configuration from './config/configuration';
import { AuthModule } from '@src/common/auth/auth.module';
import { join } from 'path';
import { PermissionService } from '@core/services/permission.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerMiddleware } from '@core/middlewares/logger.middleware';
import { ExportService } from '@core/services/export.service';
import { LogModule } from '@common/log/log.module';
import {ImportService} from "@core/services/import.service";
import { FbGraphService } from '@core/services/fbGraph.service';
import { GoogleApiService } from '@core/services/googleApi.service';
import { SendSmsService } from '@core/services/sendSms.service';
import { ReCaptchaMiddleware } from '@core/middlewares/reCaptcha.middleware';
import { InvoiceGeneratorService } from '@core/services/invoiceGenerator.service';

@Global()
@Module({
    imports: [
        LogModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            load: [configuration],
            isGlobal: true,
            expandVariables: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../'),
        }),
        ScheduleModule.forRoot(),
        I18nModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                fallbackLanguage: configService.get('translation.fallbackLocale'),
                parserOptions: {
                    path: join(__dirname, '/plugins/i18n/'),
                    watch: true,
                },
            }),
            parser: I18nJsonParser,
            inject: [ConfigService],
        }),
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    ],

    providers: [
        HelperService,
        TranslateI18nService,
        ResponseService,
        ExportService,
        ImportService,
        PermissionService,
        FbGraphService,
        GoogleApiService,
        InvoiceGeneratorService,
		SendSmsService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
    exports: [
        HelperService,
        TranslateI18nService,
        ResponseService,
        ExportService,
        ImportService,
        PermissionService,
        FbGraphService,
        GoogleApiService,
        InvoiceGeneratorService,
		SendSmsService,
    ],
})
export class CoresModule implements NestModule {
    /**
     * Global Middleware
     * @param consumer
     */
    configure(consumer: MiddlewareConsumer): any {
        /*
         * Common middleware:
         * - Helmet: Security http headers
         * - Compression: Gzip, deflate
         * - Rate limiting
         */
        consumer.apply(
            LoggerMiddleware,
            helmet(),
            compression(),
            rateLimit({
                windowMs: 1000, // 1s to reset limit
                max: 30, // limit each IP to 10 requests per windowMs
            }),
        ).forRoutes({ path: '*', method: RequestMethod.ALL });
        consumer.apply(PagingMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
        consumer.apply(LocaleMiddleware)
            //.exclude({ path: 'api/v1/admin(.*)', method: RequestMethod.ALL })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
        /*
         * End common middleware
         */

        // Project middleware must be above JWT middleware
        // consumer.apply(ProjectMiddleware)
        //     .exclude({ path: 'seed*', method: RequestMethod.GET })
        //     .forRoutes({ path: '*', method: RequestMethod.ALL });

        /*
         * Recaptcha
         */
		consumer.apply(ReCaptchaMiddleware)
            .forRoutes(
                { path: 'auth/customers/register', method: RequestMethod.ALL },
                { path: 'auth/customers/forgot-password', method: RequestMethod.ALL },
                { path: 'auth/customers/generate-invite-code', method: RequestMethod.ALL },
            );
        /*
         * JWT validate
         */
        consumer.apply(JwtUserMiddleware)
            .exclude({ path: 'auth/users/login', method: RequestMethod.ALL })
            .forRoutes(
                { path: 'admin*', method: RequestMethod.ALL },
                { path: 'auth/users/logout', method: RequestMethod.ALL },
                { path: 'auth/users/profiles', method: RequestMethod.ALL },
            );

        consumer.apply(JwtCustomerMiddleware)
            .exclude(
                { path: 'auth/customers/login', method: RequestMethod.ALL },
            )
            .forRoutes(
                { path: 'auth/customers/logout', method: RequestMethod.ALL },
                { path: 'auth/customers/profiles', method: RequestMethod.ALL },
                { path: 'auth/customers/generate-invite-code', method: RequestMethod.ALL },
                { path: 'messages*', method: RequestMethod.POST },
                { path: 'customers*', method: RequestMethod.ALL },
                { path: 'orders*', method: RequestMethod.ALL },
                { path: 'tickets*', method: RequestMethod.ALL },
                { path: 'payment-methods*', method: RequestMethod.ALL },
            );
    }
}
