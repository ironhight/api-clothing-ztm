import { Module } from '@nestjs/common';
import { RolesController } from './admin/roles.controller';
import { RolesService } from './services/roles.service';
import { TransformerRoleService } from './services/transformerRole.service';
import { PermissionsController } from '@common/roles/admin/permissions.controller';
import { EntityModule } from '@entities/entity.module';
@Module({
    imports: [EntityModule],
    controllers: [RolesController, PermissionsController],
    providers: [RolesService, TransformerRoleService],
    exports: [RolesService, TransformerRoleService],
})
export class RolesModule {
}
