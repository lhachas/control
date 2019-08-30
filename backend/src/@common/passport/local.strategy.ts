import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AutenticacionService } from '@control/api/services/autenticacion.service';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly autenticacionService: AutenticacionService) {
        super({
            usernameField: 'email',
            passwordField: 'clave',
            passReqToCallback: false,
        });
    }

    public async validate(email: string, clave: string) {
        return await this.autenticacionService.iniciarSesion({
            email,
            clave,
        } as AutenticacionDto);
    }
}
