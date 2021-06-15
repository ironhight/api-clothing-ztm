import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { TransformerRoleService } from '../services/transformerRole.service';
import { RoleDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { CoreTransformInterceptor } from '@core/interceptors/coreTransform.interceptor';
import { UserSecure } from '@src/common/auth/user/decorators/user-secure.decorator';
import { ACL } from '@common/auth/decorators/acl.decorator';
import { Permissions } from '@core/services/permission.service';
import { DefaultListQuery } from '@core/decorators/defaultListQuery.decorator';
import { ResponseService } from '@core/services/response.service';
@ApiTags('Admin/Role')
@Controller('admin/roles')
@UseInterceptors(CoreTransformInterceptor)
@UserSecure()
export class RolesController {
    constructor(
        private readonly roleService: RolesService,
        private readonly transformer: TransformerRoleService,
        private readonly response: ResponseService
    ) {}

    @Get()
    @ACL(Permissions.role_list)
    @DefaultListQuery()
    async findAll(@Query() query: Record<string, any>): Promise<any> {
        let items = await this.roleService.findAll(query);
        return this.response.fetchListSuccess(this.transformer.transformRoleList(items));
    }

    @Get(':id')
    @ACL(Permissions.role_detail)
    async findById(@Param('id') id: number): Promise<CoreResponse> {
        let item = await this.roleService.detail(id);
        if (!item) return this.response.detailFail();
        return this.response.detailSuccess(this.transformer.transformRoleDetail(item));
    }

    @Post()
    @ACL(Permissions.role_add)
    async add(@Body() dto: RoleDto): Promise<CoreResponse> {
        let item = await this.roleService.create(dto);
        if (!item) return this.response.createdFail();
        return this.response.createdSuccess(this.transformer.transformRoleDetail(item));
    }

    @Put(':id')
    @ACL(Permissions.role_edit)
    async edit(@Param('id') id: number, @Body() dto: RoleDto): Promise<CoreResponse> {
        let item = await this.roleService.update(id, dto);
        if (!item) return this.response.updatedFail();
        return this.response.updatedSuccess(this.transformer.transformRoleDetail(item));
    }

    @Delete(':id')
    @ACL(Permissions.role_delete)
    async delete(@Param('id') id: number): Promise<CoreResponse> {
        let item = await this.roleService.delete(id);
        if (!item) return this.response.deletedFail();
        return this.response.deletedSuccess();
    }
}
