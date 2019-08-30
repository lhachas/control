import { Get, Post, Body, Put, Delete,Request, Param, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AutenticacionService } from '@control/api/services/autenticacion.service';
import { AutenticacionDto } from '@control/api/dto/autenticacion.dto';
import { IAutenticacion } from '@control/api/interfaces/autenticacion.interface';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(private readonly autenticacionService: AutenticacionService) {}

    @UseGuards(AuthGuard('local'))
    @UsePipes(new ValidationPipe())
    @Post('iniciarSesion')
    async autenticacion(@Body() autenticacionDto: AutenticacionDto): Promise<IAutenticacion> {
        return await this.autenticacionService.generarToken(autenticacionDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
