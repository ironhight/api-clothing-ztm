import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@src/common/users/user.module';
import { RolesModule } from '@src/common/roles/roles.module';
import { UserAuthModule } from '@src/common/auth/user/userAuth.module';
import { CustomerModule } from './common/customers/customer.module';
import { EmailModule } from './common/email/email.module';
import { CustomerAuthModule } from './common/auth/customer/customerAuth.module';

const fs = require('fs');

async function bootstrap() {

    /*
     * Create folder tmp multer
     */
    fs.mkdirSync(process.env.PREFIX_UPLOAD_TMP, { recursive: true });
    console.log(`Create upload tmp folder: ${process.env.PREFIX_UPLOAD_TMP}`);

    /*
     * Init app
     */
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);

    app.useStaticAssets(join(__dirname, '..', 'public'));

    /*
     * CORS
     */
    app.enableCors();

    /*
     * Global prefix version
     */
    let basePath = config.get('app.basePath');
    if(!basePath) basePath = "/";
    if(basePath != "/" && basePath.charAt(0) != "/") basePath = "/" + basePath + "/";
    app.setGlobalPrefix(basePath + 'api/v1');

    /*
     * Global pipes transform
     */
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
    }));

    /*
     * Proxy
     */
    app.set('trust proxy', 1);

    /*
     * Swagger configurations
     */
    if (config.get('node.env') !== 'production') {
        basePath = basePath.replace(/^\//g, '');
        new Swagger(app).setup(basePath);
    }

    /*
     * Start app
     */
    await app.listen(config.get<number>('node.port'));
    console.log(`Application is running on: ${await app.getUrl()}`);
    if (config.get('node.admin_mode')) {
        console.log(`
        ****************************
        ***** ADMIN MODE IS ON *****
        ****************************`);
    }
    // console.log(true ? 1 && false && true : 3);
    // console.log(true ? 1 || false || true : 3);
}

class Swagger {
    constructor(private app: NestExpressApplication) {
    }

    /**
     * Register more swagger api here
     */
    setup(basePath = ""): void {
        // Main API
        this.register(undefined, basePath + 'api');

        // The Lab 2020 API
        // this.register([CustomerModule, CustomerAuthModule], 'api/the-lab-2020', 'The lab 2020 API', null, '1.0');
    }

    register(extraModules?: any[], path?: string, title?: string, description?: string, version?: string): void {
        const mainModules = [
            AppModule,
            UserAuthModule,
			CustomerAuthModule,
            RolesModule,
            CustomerModule,
            EmailModule,
            UserModule,
        ];
        if (extraModules) {
            mainModules.push(...extraModules);
        }

        const siteTitle = title || 'Example Swagger APIs';
        const options = new DocumentBuilder()
            .setTitle(siteTitle)
            .setDescription(description || 'DigiNest APIs description')
            .setVersion(version || '1')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(this.app, options, {
            include: mainModules,
        });
        SwaggerModule.setup(path || 'api', this.app, document, { customSiteTitle: siteTitle });
    }
}

bootstrap();
