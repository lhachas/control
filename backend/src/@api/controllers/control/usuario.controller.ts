import { Get, Post, Body, Put, Delete, Param, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { AutenticacionService } from '@control/api/services/autenticacion.service';
import { UsuarioDto } from '@control/api/dto/usuario.dto';
import { UsuarioService } from '@control/api/services/usuario.service';
import { UsuarioEntity } from '@control/db/entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('nuevo')
    @UsePipes(new ValidationPipe())
    async Nuevo(@Body() usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        return await this.usuarioService.Nuevo(usuarioDto);
    }
}
