import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { IUsuario } from '@control/api/interfaces/usuario.interface';
import { AuthService } from '@control/api/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'leonelhs',
        });
    }

    public async validate(payload: IUsuario, done: VerifiedCallback) {
        const usuario = await this.authService.validaPayload(payload);

        if(!usuario) {
            return done(new HttpException('', HttpStatus.UNAUTHORIZED), false);
        }

        return {
            id: payload.id,
            usuario: payload.usuario,
            razonSocial: payload.razonSocial,
            nombreComercial: payload.nombreComercial,
            email: payload.email,
            telfFijo: payload.telfFijo,
            telfMovil: payload.telfMovil,
            direccion: payload.direccion,
            urbanizacion: payload.urbanizacion,
            departamento: payload.departamento,
            provincia: payload.distrito,
            distrito: payload.distrito,
            token: payload.token,
            perfil: payload.perfil,
            estado: payload.estado,
        };
    }
}
