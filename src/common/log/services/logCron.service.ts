import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '@entities/log.entity';

@Injectable()
export class LogCronService {
    constructor(
        @InjectRepository(Log) private log: Repository<Log>,
    ) {}

    async deleteDeleteExpireLog() {
        return this.log.createQueryBuilder()
            .delete()
            .from('logs')
            .where("expireAt <= :expireAt", { expireAt:  new Date})
            .execute();
    }
}
