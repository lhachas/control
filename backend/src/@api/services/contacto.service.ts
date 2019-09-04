import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ContactoModel } from '@control/api/models/contacto.model';
import { ContactoDto } from '@control/api/dto/contacto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContactoService {
    constructor(@InjectRepository(ContactoModel) private readonly contactoRepository: Repository<ContactoModel>) {}

    public async listar(): Promise<ContactoModel[]> {
        return await this.contactoRepository.find();
    }

    public async getContacto(idUsuario: number): Promise<ContactoModel> {
        try {
            const contacto = await this.contactoRepository
                .createQueryBuilder('contacto')
                .innerJoinAndSelect('contacto.personal', 'personal', 'personal.id_contacto = contacto.id')
                .innerJoinAndSelect('personal.perfil', 'perfil', 'personal.id_perfil = perfil.id')
                .innerJoinAndSelect('personal.usuario', 'usuario', 'usuario.id_personal = personal.id')
                .where('usuario.id = :id', { id: idUsuario })
                .getOne();
            return contacto;
        } catch (error) {
            throw error;
        }
    }
}
