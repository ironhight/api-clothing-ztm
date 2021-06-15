import { Module } from '@nestjs/common';
import { UserController } from "@src/common/users/admin/user.controller";
import { UserService } from "@src/common/users/services/user.service";
import { TransformerUserService } from "@src/common/users/services/transformerUser.service";
import { RolesModule } from '@common/roles/roles.module';
import { EntityModule } from '@entities/entity.module';
@Module({
    imports: [EntityModule, RolesModule],
    controllers: [UserController],
    providers: [UserService, TransformerUserService],
    exports: [UserService, TransformerUserService]
})
export class UserModule {
}
