import {
    Entity,
    Column,
    BeforeInsert,
    BeforeUpdate,
    BeforeRemove,
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

import { PersonalModel } from '@control/api/models/personal.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({name: 'usuario'})
export class UsuarioModel extends BaseModel {
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ValidateNested({ always: true })
    @Type((t) => PersonalModel)
    @OneToOne((type) => PersonalModel, (p) => p.usuario, { cascade: true })
    @JoinColumn({ name: 'id_personal' })
    public personal: UsuarioModel;

    @Column({ unique: true, nullable: false })
    @IsString()
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({
        groups: [CREATE],
        message: 'El usuario es obligatorio.',
    })
    public usuario: string;

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
    public clave: string;

    @Column({ default: '' })
    @IsString()
    public token: string;

    @Column({ default: 'ACTIVO' })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString()
    @IsNotEmpty()
    public estado: string;

    @BeforeInsert()
    async b4register() {
        this.estado = await 'ACTIVO';
        this.clave = await hash(this.clave, 10);
    }

    @BeforeUpdate()
    async b4update() {
        this.clave = await hash(this.clave, 10);
    }

    @BeforeRemove()
    async b4block() {
        this.estado = 'INACTIVO';
    }

    async validaClave(clave) {
        return await compare(clave, this.clave);
    }
}
