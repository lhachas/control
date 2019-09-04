import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UsuarioModel } from '@control/api/models/usuario.model';

@Injectable()
export class UsuarioService extends TypeOrmCrudService<UsuarioModel> {

    constructor(@InjectRepository(UsuarioModel) private readonly usuarioRepository: Repository<UsuarioModel>) {
        super(usuarioRepository);
    }

    async getUsuario(usuario: string): Promise<UsuarioModel> {
        try {
            return await this.usuarioRepository.findOneOrFail({ usuario });
        } catch (error) {
            throw new NotFoundException(`El usuario ${usuario} no se encontró.`);
        }
    }
}
