import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalModel } from '@control/api/models/personal.model';

@Injectable()
export class PersonalService {
    constructor(@InjectRepository(PersonalModel) private readonly personalRepository: Repository<PersonalModel>) {}

    public async getPersonal(idPersonal: number): Promise<PersonalModel> {
        try {
            return await this.personalRepository.findOneOrFail({ id: idPersonal });
        } catch (error) {
            throw error;
        }
    }
}
