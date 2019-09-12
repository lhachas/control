import {
    Entity,
    Column,
    BeforeInsert,
    BeforeUpdate,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { hash, compare } from 'bcrypt';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { BaseModel } from '@control/api/models/base/base.model';

import { StaffModel } from '@control/api/models/staff.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({name: 'user'})
export class UserModel extends BaseModel {
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ValidateNested({ always: true })
    @Type((t) => StaffModel)
    @OneToOne((type) => StaffModel, (p) => p.user, { cascade: true })
    @JoinColumn({ name: 'staff_id' })
    public staff: StaffModel;

    @IsString()
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({
        groups: [CREATE],
        message: 'El usuario es obligatorio.',
    })
    @Column({ unique: true, nullable: false })
    public username: string;

    @Column()
    @MinLength(6, {
        groups: [CREATE],
        message: 'Debe tener al menos 6 caracteres.',
    })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({
        groups: [CREATE],
        message: 'La clave es obligatorio.',
    })
    public password: string;

    @Column({ default: '' })
    @IsString()
    public token: string;

    @BeforeInsert()
    async b4register() {
        this.password = await hash(this.password, 10);
    }

    @BeforeUpdate()
    async b4update() {
        this.password = await hash(this.password, 10);
    }

    async validatePassword(password) {
        return await compare(password, this.password);
    }
}
