import { Column, Entity, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '@control/api/models/base/base.model';

import { ContactModel } from '@control/api/models/contact.model';

@Entity({ name: 'document_type' })
export class DocumentTypeModel extends BaseModel {
    @Column()
    public code: string;

    @Column()
    @IsString()
    public description: string;

    @Column()
    @IsString()
    public abbreviation: string;

    @OneToOne((type) => ContactModel, (c) => c.documentType)
    @Type((t) => ContactModel)
    contact: ContactModel;
}
