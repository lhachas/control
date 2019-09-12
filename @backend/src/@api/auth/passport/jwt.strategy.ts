import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { IUser } from '@control/api/interfaces/user.interface';
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

    public async validate(payload: IUser, done: VerifiedCallback) {
        const usuario = await this.authService.validateUser(payload);

        if(!usuario) {
            return done(new UnauthorizedException('No tienes Acceso.'), false);
        }

        done(null, usuario);
    }
}
