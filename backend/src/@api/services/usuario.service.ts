import { Injectable, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '@control/db/entities/usuario.entity';
import { UsuarioDto } from '@control/api/dto/usuario.dto';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(UsuarioEntity) private readonly usuarioRepository: Repository<UsuarioEntity>) {}

    async getUsuario(usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        const { email } = usuarioDto;
        try {
            return await this.usuarioRepository.findOne({ email });
        } catch (error) {
            throw new NotFoundException(`El usuario con el email ${ email } no se econtró.`);
        }
    }

    async Nuevo(usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        try {
            const usuario = new UsuarioEntity();
            usuario.nombreUsuario = usuarioDto.nombreUsuario;
            usuario.email = usuarioDto.email;
            usuario.clave = usuarioDto.clave;
            usuario.rol = usuarioDto.rol;
            return await this.usuarioRepository.save(usuario);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
