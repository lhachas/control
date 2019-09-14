import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Repository } from 'typeorm';
import { ContactModel } from '@control/api/models/contact.model';

@Injectable()
export class ContactService extends TypeOrmCrudService<ContactModel> {
    constructor(@InjectRepository(ContactModel) public contactRepository: Repository<ContactModel>) {
        super(contactRepository);
    }
}
