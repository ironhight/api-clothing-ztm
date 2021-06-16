import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { isIn, isNotEmpty } from 'class-validator';
import { Customer } from '@entities/customer.entity';
import { convertContentFileDto, saveThumbOrPhotos } from '@core/helpers/content';
import { HelperService } from '@core/services/helper.service';
import * as moment from 'moment';
import { DateTime } from '@core/constants/dateTime.enum';
import { EmailService } from '@common/email/email.service';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(forwardRef(() => EmailService)) private readonly emailService: EmailService,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,

        private helperService: HelperService,
    ) {}

    async findAll(query: Record<string, any>): Promise<any> {
        const page = query.page;
        const limit = query.limit;
        let select = undefined;
        const where = {};
        const order = {};
        order[query.orderBy] = query.order;

        if (isNotEmpty(query.selects)) {
            const selectTmp = [];
            query.selects.split(',').forEach(select => selectTmp.push(select));
            select = selectTmp;
        }

        if (isNotEmpty(query.name)) {
            where['name'] = Like(`%${query.name}%`);
        }

        if (isNotEmpty(query.email)) {
            where['email'] = Like(`%${query.email}%`);
        }

        if (isIn(query['active'], [true, false, 'true', 'false'])) {
            where['active'] = query['active'] === 'true' ? true : false;
        }

        if (isNotEmpty(query.get)) {
            const get = parseInt(query.get);
            const take = isNaN(get) ? undefined : get;
            return this.customerRepo.find({ select, where, order, take });
        } else {
            return paginate<Customer>(this.customerRepo, { page, limit }, { select, where, order });
        }
    }

    async findOne(query: Record<string, any>, options?: Record<string, any>): Promise<Customer> {
        return this.customerRepo.findOne({ ...query }, { ...options });
    }

    async create(data: Record<string, any>, files?: Record<any, any>): Promise<Customer> {
        if (data['password']) data['password'] = await this.helperService.hash(data['password']);
        if (data['active']) data['active'] = data['active'] === 'true';

        await convertContentFileDto(data, files, ['profileImage']);

        let customer = await this.customerRepo.save(data);
        customer = await this.customerRepo.findOne(`${customer.id}`)
        await saveThumbOrPhotos(customer);
       
        this.emailService.sendMail(`${customer.email}`, '[CLOTHING-ZTM] Create new account successfully', './createNewAccountCustomer', { name: customer.name }, false);
        return customer;
    }

    async update(id: number, data: Record<string, any>, files?: Record<any, any>): Promise<Customer> {
        if (typeof data['password'] != 'undefined') data['password'] = await this.helperService.hash(data['password']);
        if (typeof data['active'] != 'undefined') data['active'] = data['active'] == 'true' ? true : false;

        await convertContentFileDto(data, files, ['profileImage']);
        await this.customerRepo.update(id, data);
        await saveThumbOrPhotos(await this.customerRepo.findOne(id));

        return this.customerRepo.findOne(id);
    }

    async detail(id: number): Promise<Customer> {
        return this.customerRepo.findOne(id);
    }

    async delete(id: number): Promise<any> {
        const item = await this.customerRepo.findOne(id);
        return this.customerRepo.remove(item);
    }

    async changePassword(data, customer) {
        let exitsCustomer = await this.customerRepo.findOne({ id: customer.id });
        const password = await this.helperService.hash(data['newPassword']);
        exitsCustomer = await this.customerRepo.save({ ...exitsCustomer, password });

        return true;
    }

    async totalCustomer(): Promise<any> {
        return await this.customerRepo.count();
    }

    async totalInActiveCustomer(): Promise<any> {
        return await this.customerRepo.count({ active: false });
    }

    async inviteFriends(customer: Customer) {
        return await this.customerRepo.findOne({ where : {}})
    }

    async findOneCustomer(id: number): Promise<any> {
        const customer = await this.customerRepo.findOne({ where: { id, active: true } });

        if (!customer) {
            this.helperService.throwException('Customer not found', 406);
        }

        return customer;
    }

    public transformCustomerExport(docs, appendData = {}, fileName?: string, customHeaders?: string[]){
        return {
            excel: {
                name: fileName || `Customers-${moment().format('YYYY-MM-DD')}`,
                data: docs.length > 0 ? docs.map((doc: Customer) => {
                    return {
                        id: doc.id,
                        image: doc.thumb('profileImage', 'FB'),
                        name: doc.name,
                        active: doc.active,
                        email: doc.email,
                        phone: doc.phone,
                        profileId: doc.profileId,
                        registerSource: doc.registerSource,
                        createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                        updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                    };
                }) : [{}],
                customHeaders: customHeaders || [
                    'ID',
                    'Profile Image',
                    'Name',
                    'Active',
                    'Email',
                    'Phone',
                    'ProfileId',
                    'Register Source',
                    'Create date',
                    'Update date',
                ],                
            }
        };
    }
}
