import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { TransformerCustomerService } from './services/transformerCustomer.service';
import { BeCustomerController } from '@common/customers/admin/beCustomer.controller';
import { EntityModule } from '@entities/entity.module';
import { TransformerZoneService } from '../zones/services/transformerZone.service';
import { EmailModule } from '../email/email.module';
@Module({
    imports: [EntityModule, forwardRef(() => EmailModule)],
    controllers: [BeCustomerController],
    providers: [CustomerService, TransformerCustomerService, TransformerZoneService],
    exports: [CustomerService, TransformerCustomerService, TransformerZoneService]
})
export class CustomerModule {
}
