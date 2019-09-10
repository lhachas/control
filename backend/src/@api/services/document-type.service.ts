import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeModel } from '@control/api/models/document-type.model';

@Injectable()
export class DocumentTypeService {

    constructor(@InjectRepository(DocumentTypeModel) private readonly documentTypeRepository: Repository<DocumentTypeModel>) {}

    public async findAll(): Promise<DocumentTypeModel[]> {
        try {
            return await this.documentTypeRepository.find({
                where: {
                    estado: 'ACTIVO',
                },
            });
        } catch (error) {
            throw error;
        }
    }
}
