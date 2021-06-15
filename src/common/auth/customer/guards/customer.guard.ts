import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const permission = this.reflector.get<string[]>('permission', context.getHandler());
        if (typeof permission == 'undefined') {
            return true;
        }

        return request.user.role.isAdmin;
    }
}
