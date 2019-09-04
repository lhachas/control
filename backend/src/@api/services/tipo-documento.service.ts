import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDocumentoModel } from '@control/api/models/tipo-documento.model';

@Injectable()
export class TipoDocumentoService {

    constructor(@InjectRepository(TipoDocumentoModel) private readonly tipoDocumentoRepository: Repository<TipoDocumentoModel>) {}

    public async Listar(): Promise<TipoDocumentoModel[]> {
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
