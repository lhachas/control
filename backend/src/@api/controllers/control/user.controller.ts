import { Get, Post, Body, Put, Delete, Param, UseGuards, Controller, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@control/common/pipes/validation.pipe';
import { UsuarioDto } from '@control/api/dto/user.dto';
import { UserService } from '@control/api/services/user.service';
import { UserModel } from '@control/api/models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post('nuevo')
    // @UsePipes(new ValidationPipe())
    // async nuevo(@Body() usuarioDto: UsuarioDto): Promise<UsuarioModel> {
    //     return await this.usuarioService.nuevo(usuarioDto);
    // }
}
