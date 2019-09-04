import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsString, IsOptional, IsNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { UsuarioModel } from '@control/api/models/usuario.model';
import { ContactoModel } from '@control/api/models/contacto.model';
import { EmpresaModel} from '@control/api/models/empresa.model';
import { PerfilModel } from '@control/api/models/perfil.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'personal' })
export class PersonalModel extends BaseModel {
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => PerfilModel, (e) => e.personal, { cascade: true })
    @JoinColumn({ name: 'id_perfil' })
    public perfil: PerfilModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ValidateNested({ always: true })
    @Type((t) => ContactoModel)
    @OneToOne((type) => ContactoModel, (c) => c.personal, { cascade: true })
    @JoinColumn({ name: 'id_contacto' })
    public contacto: ContactoModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne((type) => EmpresaModel, (e) => e.personales, { cascade: true })
    @JoinColumn({ name: 'id_empresa' })
    public empresa: EmpresaModel;

    @IsString()
    @Column()
    public estado: string;

    /**
     * @description [RELACIONES]
     */
    @OneToOne((type) => UsuarioModel, (u) => u.personal)
    public usuario?: UsuarioModel;

    @BeforeInsert()
    async defaultInsert(): Promise<void> {
        this.estado = await 'ACTIVO';
    }
}
