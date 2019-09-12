import { Column, Entity, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '@control/api/models/base/base.model';

import { ContactModel } from '@control/api/models/contact.model';
import { CompanyModel } from '@control/api/models/company.model';

@Entity({ name: 'ubigeo' })
export class UbigeoModel extends BaseModel {
    @Column()
    public ubigeo: string;

    @Column()
    @IsString()
    public departament: string;

    @Column()
    @IsString()
    public province: string;

    @Column()
    @IsString()
    public district: string;

    @Column({ name: 'country_code' })
    @IsString()
    public countryCode: string;

    @OneToOne((type) => ContactModel, (c) => c.ubigeo)
    @Type((t) => ContactModel)
    contact: ContactModel;

    @OneToOne((type) => CompanyModel, (e) => e.ubigeo)
    company: CompanyModel;
}
