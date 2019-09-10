import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if(!roles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        return user;
    }
}
