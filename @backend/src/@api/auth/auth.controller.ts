import { Get, Inject, Post, Request, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AuthService } from '@control/api/auth/auth.service';
import { AuthDto } from '@control/api/dto/auth.dto';
import { IAuth } from '@control/api/interfaces/auth.interface';
import { AppConfig } from '@control/config/app.config';
import { RolesGuard } from '@control/common/guards/roles.guard';
import { AccessGuard } from '@control/common/guards/access.guard';
import { Roles } from '@control/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                @Inject('APP.CONFIG') private readonly configApp: AppConfig) {}

    @UseGuards(AuthGuard('local'))
    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.authService.token(req.user);
    }

    @UseGuards(AccessGuard)
    // @Roles('ADMIN')
    @Get('perfil')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('email')
    async sendMail() {
        if (await this.authService.sendEmailForgotPassword('yoshiro.tk@hotmail.com')) {
            return 'enviado';
        } else {
            return 'no enviado';
        }
    }
}
