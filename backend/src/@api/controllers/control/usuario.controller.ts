import { Get, Post, Body, Put, Delete, Param, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { UsuarioDto } from '@control/api/dto/usuario.dto';
import { UsuarioService } from '@control/api/services/usuario.service';
import { UsuarioModel } from '@control/api/models/usuario.model';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // @Post('nuevo')
    // @UsePipes(new ValidationPipe())
    // async nuevo(@Body() usuarioDto: UsuarioDto): Promise<UsuarioModel> {
    //     return await this.usuarioService.nuevo(usuarioDto);
    // }
}
