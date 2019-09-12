import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@control/api/auth/auth.service';
import { AuthDto } from '@control/api/dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: false,
        });
    }

    public async validate(email: string, password: string) {
        return await this.authService.login({ email, password } as AuthDto);
    }
}
