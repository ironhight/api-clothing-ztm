import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenBlacklist } from '@entities/tokenBlacklist.entity';

@Injectable()
export class BlacklistCronService {
    constructor(
        @InjectRepository(TokenBlacklist) private tokenBlacklist: Repository<TokenBlacklist>,
    ) {}

    async deleteExpireToken() {
        return this.tokenBlacklist.createQueryBuilder()
            .delete()
            .from(TokenBlacklist)
            .where("expireAt <= :expireAt", { expireAt:  new Date})
            .execute();
    }
}
