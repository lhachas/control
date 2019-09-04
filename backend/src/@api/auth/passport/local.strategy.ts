import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@control/api/auth/auth.service';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly autenticacionService: AuthService) {
        super({
            usernameField: 'usuario',
            passwordField: 'clave',
            passReqToCallback: false,
        });
    }

    public async validate(usuario: string, clave: string) {
        return await this.autenticacionService.iniciarSesion({
            usuario,
            clave,
        } as AutenticacionDto);
    }
}
