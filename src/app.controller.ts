import { Controller, Get } from '@nestjs/common';
import { HelperService } from '@core/services/helper.service';
import { EmailService } from '@common/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@src/entities/role.entity';
import { User } from '@src/entities/user.entity';
import { exec } from 'child_process';

@Controller()
export class AppController {
    constructor(
      private emailService: EmailService, 
      private helperService: HelperService, 
      
      @InjectRepository(Role) private role: Repository<Role>, 
      @InjectRepository(User) private user: Repository<User>
    ) {}

    private seedNames: Array<string>;

    @Get('migrate-revert')
    async migrateRevert(): Promise<any> {
        if (process.env.NODE_ENV == 'production') return;
        exec('npm run typeorm migration:revert', (err, stdout, stderr) => {
            if (err) {
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }

    @Get('migrate-up')
    async migrateUp(): Promise<any> {
        exec('npm run typeorm migration:run', (err, stdout, stderr) => {
            if (err) {
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }

    @Get('seed')
    async generateData(): Promise<string> {
        this.seedNames = [];

        /*
        Role Seeder
         */
        await this.roleSeeder();

        /*
        User Seeder
         */
        await this.userSeeder();

        if (this.seedNames.length) {
            return this.seedNames
                .map((name) => {
                    return `Seeded ${name}`;
                })
                .join('\n');
        } else {
            return 'No seeder';
        }
    }

    private async roleSeeder() {
        const role = await this.role.findOne();
        if (!role) {
            let a = await this.role.save({ name: 'admin', isAdmin: true });
            this.seedNames.push('Role');
        }
    }

    private async userSeeder() {
        const user = await this.user.findOne();
        if (!user) {
            const role = await this.role.findOne({ isAdmin: true });
            await this.user.save({
                name: 'admin',
                email: 'hoainam.ironhight@gmail.com',
                password: await this.helperService.hash('Ironhight'),
                role: role,
                active: true,
            });
            this.seedNames.push('User');
        }
    }

    @Get('/healthcheck')
    healthCheck(): Record<string, any> {
        return {
            status: 'ok',
        };
    }

    @Get('/send-mail')
    async sendMail(): Promise<any> {
        const result = this.emailService.sendMail(
            'hoainam.ironhight@gmail.com',
            '[TEST SEND MAIL] API-ZTM',
            '.index',
            {
                code: '123456',
                username: 'Ironhight',
            },
            true,
        );

        console.log('🚀 ~ file: app.controller.ts ~ line 105 ~ AppController ~ sendMail ~ result', result);

        return true;
    }
}
