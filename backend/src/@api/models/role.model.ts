import { Entity, Column, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

import { StaffModel } from '@control/api/models/staff.model';

@Entity({ name: 'role' })
export class RoleModel extends BaseModel {
    @Column({ name: 'rolename' })
    public rolename: string;

    @IsString()
    @Column()
    public image: string;

    @OneToOne((type) => StaffModel, (p) => p.role)
    staff: StaffModel;
}
