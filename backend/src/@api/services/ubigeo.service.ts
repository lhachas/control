import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbigeoEntity } from '@control/db/entities/ubigeo.entity';

@Injectable()
export class UbigeoService {
    constructor(@InjectRepository(UbigeoEntity) private readonly ubigeoRepository: Repository<UbigeoEntity>) {}

    public async create(): Promise<UbigeoEntity> {
        const geo = new UbigeoEntity();
        geo.codigoPais = '2';
        geo.departamento = 'Cusco';
        geo.distrito = 'Cusco';
        geo.ubigeo = '1111';
        return await this.ubigeoRepository.save(geo);
    }
}
