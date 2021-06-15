import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { isEmpty, isNotEmpty } from "class-validator";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userNeed = this.reflector.get<string>('acl', context.getHandler());

        // Check if user passed auth yet
        if (isEmpty(request.user) || isEmpty(request.user.role) || isEmpty(userNeed)) {
            return false;
        }

        // Check is admin
        if (request.user.role.isAdmin) {
            return true;
        }

        // Check permissions
        return request.user.role.permissions && isNotEmpty(request.user.role.permissions[userNeed]);
    }
}
