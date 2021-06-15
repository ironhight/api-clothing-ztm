import { Injectable, Request, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from '@core/services/helper.service';
import { Repository } from 'typeorm';
import { TokenBlacklist } from '@entities/tokenBlacklist.entity';

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(TokenBlacklist) private tokenBlacklist: Repository<TokenBlacklist>,
        private helperService: HelperService,
    ) {}

    async findOne(query: Record<string, any>): Promise<TokenBlacklist> {
        return this.tokenBlacklist.findOne(query);
    }
    
    async create(attribute: Object): Promise<TokenBlacklist> {
        return this.tokenBlacklist.save(attribute);
    }
}
