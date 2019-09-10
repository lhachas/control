import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactModel } from '@control/api/models/contact.model';

@Injectable()
export class ContactService {
    constructor(@InjectRepository(ContactModel) private readonly contactRepository: Repository<ContactModel>) {}

    public async getContact(id: number): Promise<ContactModel> {
        try {
            const contact = await this.contactRepository
                .createQueryBuilder('contact')
                .innerJoinAndSelect('contact.staff', 'staff')
                .innerJoinAndSelect('staff.role', 'role')
                .innerJoinAndSelect('staff.user', 'user')
                .where('user.id = :id', { id })
                .getOne();
            return contact;
        } catch (error) {
            throw new NotFoundException(`El contacto con el id: [${id}] no se encuentra.`);
        }
    }
}
