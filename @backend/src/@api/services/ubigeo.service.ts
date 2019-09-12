import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbigeoModel } from '@control/api/models/ubigeo.model';

@Injectable()
export class UbigeoService {

    constructor(@InjectRepository(UbigeoModel) private readonly ubigeoRepository: Repository<UbigeoModel>) {}

    public async create(): Promise<UbigeoModel> {
        const geo = new UbigeoModel();
        geo.countryCode = '2';
        geo.departament = 'Cusco';
        geo.district = 'Cusco';
        geo.ubigeo = '1111';
        return await this.ubigeoRepository.save(geo);
    }
}
