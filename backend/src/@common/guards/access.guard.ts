import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '@control/api/interfaces/user.interface';

@Injectable()
export class AccessGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            await super.canActivate(context);
        } catch (error) {
            Logger.error('Error in canActive', error.message, AccessGuard.name);
        }

        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user: IUser = request.user;
        const hasRole = roles ? roles.filter(roleName => user && user.staff.role.rolename === roleName).length > 0 : null;
        return hasRole === true || (hasRole === null);
    }
}
