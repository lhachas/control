import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { StaffModel } from '@control/api/models/staff.model';
import { ContactModel } from '@control/api/models/contact.model';
import { UbigeoModel } from '@control/api/models/ubigeo.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'company' })
export class CompanyModel extends BaseModel {
    @IsString()
    @Column()
    public ruc: string;

    @IsString()
    @Column({ name: 'business_name' })
    public businessName: string;

    @IsString()
    @Column({ name: 'trade_name' })
    public tradeName: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    // @OneToOne((type) => ContactoModel, (c) => c.empresa)
    @Column({ name: 'representative' })
    public representative: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => UbigeoModel, (u) => u.company)
    @JoinColumn({ name: 'ubigeo_id' })
    public ubigeo: UbigeoModel;

    @IsString()
    @Column()
    public arigv: string;

    @IsString()
    @Column()
    public apvi: string;

    @IsString()
    @Column()
    public apcl: string;

    @IsString()
    @Column()
    public address: string;

    @IsString()
    @Column()
    public urbanization: string;

    @IsString()
    @Column({ name: 'fixed_phone' })
    public fixedPhone: string;

    @IsString()
    @Column({ name: 'mobile_phone' })
    public mobilePhone: string;

    @IsString()
    @Column()
    public activity: string;

    @IsString()
    @Column()
    public email: string;

    @IsString()
    @Column()
    public logo: string;

    @OneToMany((type) => StaffModel, (p) => p.company)
    @Type((t) => StaffModel)
    staffs: StaffModel[];
}
