import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDocumentoEntity } from '@control/db/entities/tipo-documento.entity';

@Injectable()
export class TipoDocumentoService {

    constructor(@InjectRepository(TipoDocumentoEntity) private readonly tipoDocumentoRepository: Repository<TipoDocumentoEntity>) {}

    public async Listar(): Promise<TipoDocumentoEntity[]> {
        try {
            return await this.tipoDocumentoRepository.find({
                where: {
                    estado: 'ACTIVO',
                },
            });
        } catch (error) {
            throw error;
        }
    }
}
