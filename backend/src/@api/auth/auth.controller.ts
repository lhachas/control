import { Get, Post, Body, Request, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AuthService } from '@control/api/auth/auth.service';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';
import { IAutenticacion } from '@control/api/interfaces/autenticacion.interface';

@Controller('autenticacion')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @UsePipes(new ValidationPipe())
    @Post('iniciarSesion')
    async auth(@Request() req): Promise<IAutenticacion> {
        return req;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
