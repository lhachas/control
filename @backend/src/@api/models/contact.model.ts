import { Column, Index, Entity, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsString, IsOptional, IsEmail, IsNotEmpty, IsDate } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { DocumentTypeModel } from '@control/api/models/document-type.model';
import { UbigeoModel } from '@control/api/models/ubigeo.model';
import { StaffModel } from '@control/api/models/staff.model';
import { CompanyModel } from '@control/api/models/company.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'contact' })
export class ContactModel extends BaseModel {
    @IsString()
    @IsNotEmpty()
    @Column({ name: 'business_name' })
    public businessName: string;

    @IsString()
    @IsNotEmpty()
    @Column({ name: 'trade_name' })
    public tradeName: string;

    @IsString()
    @IsNotEmpty()
    @Column({ name: 'avatar' })
    public avatar: string;

    @IsString()
    @Column()
    public type: string;

    @IsString()
    @Column()
    public condition: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => DocumentTypeModel, (t) => t.contact)
    @JoinColumn({ name: 'document_type_id' })
    public documentType: DocumentTypeModel;

    @Column({ name: 'document_number' })
    public documentNumber: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => UbigeoModel, (u) => u.contact, { cascade: true})
    @JoinColumn({ name: 'ubigeo_id' })
    public ubigeo: UbigeoModel;

    @Column()
    public address: string;

    @IsString()
    @Column()
    public urbanization: string;

    @Column({ name: 'fixed_phone' })
    public fixedPhone: string;

    @Column({ name: 'mobile_phone' })
    public mobilePhone: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Column()
    @Index({ unique: true })
    public email: string;

    @IsDate()
    @CreateDateColumn({
        name: 'birthday',
        precision: null,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public birthday: Date;

    @IsString()
    @Column()
    public observations: string;

    @OneToOne((type) => StaffModel, (p) => p.contact)
    staff: StaffModel;
}
