import { Column, Index, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { DocumentTypeModel } from '@control/api/models/document-type.model';
import { UbigeoModel } from '@control/api/models/ubigeo.model';
import { StaffModel } from '@control/api/models/staff.model';
import { CompanyModel } from '@control/api/models/company.model';
import { UserStarredModel } from '@control/api/models/user-starred.model';

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

    @IsString()
    @Column()
    public observations: string;

    @OneToOne((type) => StaffModel, (p) => p.contact)
    staff: StaffModel;

    @OneToOne((type) => UserStarredModel, (p) => p.contact)
    starred: UserStarredModel;
}
