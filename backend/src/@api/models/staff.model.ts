import { Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsString, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { UserModel } from '@control/api/models/user.model';
import { ContactModel } from '@control/api/models/contact.model';
import { CompanyModel} from '@control/api/models/company.model';
import { RoleModel } from '@control/api/models/role.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'staff' })
export class StaffModel extends BaseModel {
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => RoleModel, (e) => e.staff, { cascade: true })
    @JoinColumn({ name: 'role_id' })
    public role: RoleModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ValidateNested({ always: true })
    @Type((t) => ContactModel)
    @OneToOne((type) => ContactModel, (c) => c.staff, { cascade: true })
    @JoinColumn({ name: 'contact_id' })
    public contact: ContactModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne((type) => CompanyModel, (e) => e.staffs, { cascade: true })
    @JoinColumn({ name: 'company_id' })
    public company: CompanyModel;

    /**
     * @description [RELACIONES]
     */
    @OneToOne((type) => UserModel, (u) => u.staff)
    public user?: UserModel;
}
