import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUser } from '@control/api/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if(!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user: IUser = req.user;
        console.log(user);
        const hasRole = roles ? roles.filter(roleName => user && user.staff.role.rolename === roleName).length > 0 : null;
        let hasPermission = false;
        if (hasRole) {
            hasPermission = true;
            if (req.params.email || req.body.email) {
                if (user.staff.contact.email !== req.params.email && user.staff.contact.email !== req.body.email) {
                    hasPermission = false;
                }
            }
        }
        return user && user.staff.role.rolename && hasPermission;
    }
}
