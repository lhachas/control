import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ContactoEntity } from '@control/db/entities/contacto.entity';
import { ContactoDto } from '@control/api/dto/contacto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContactoService {
    constructor(@InjectRepository(ContactoEntity) private readonly contactoRepository: Repository<ContactoEntity>) {}

    public async Listar(): Promise<ContactoEntity[]> {
        return await this.contactoRepository.find();
    }

    public async Buscar(id: number): Promise<ContactoEntity> {
        try {
            return await this.contactoRepository.findOneOrFail({ id });
        } catch (error) {
            throw error;
        }
    }

    public async Nuevo(contactoDto: ContactoDto): Promise<ContactoEntity> {
        try {
            return await this.contactoRepository.save(plainToClass(ContactoEntity, contactoDto));
        } catch (error) {
            throw error;
        }
    }

    public async Actualizar(contactoDto: ContactoDto): Promise<UpdateResult> {
        try {
            return await this.contactoRepository.update(contactoDto.id, contactoDto);
        } catch (error) {
            throw error;
        }
    }

    public async Eliminar(id: number): Promise<DeleteResult> {
        try {
            return await this.contactoRepository.delete({ id });
        } catch (error) {
            throw error;
        }
    }
}
