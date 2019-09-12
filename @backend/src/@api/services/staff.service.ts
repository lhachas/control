import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffModel } from '@control/api/models/staff.model';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(StaffModel) private readonly staffRepository: Repository<StaffModel>) {}

    public async getPersonal(idPersonal: number): Promise<StaffModel> {
        try {
            return await this.staffRepository.findOneOrFail({ id: idPersonal });
        } catch (error) {
            throw error;
        }
    }
}
