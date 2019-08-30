import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'leonelhs',
        });
    }

    public async validate(payload: any) {
        return {
            id: payload.id,
            nombreUsuario: payload.nombreUsuario,
            email: payload.email,
            rol: payload.rol,
            estado: payload.estado,
        };
    }
}
