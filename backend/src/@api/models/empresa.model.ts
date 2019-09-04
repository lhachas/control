import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { PersonalModel } from '@control/api/models/personal.model';
import { ContactoModel } from '@control/api/models/contacto.model';
import { UbigeoModel } from '@control/api/models/ubigeo.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'empresa' })
export class EmpresaModel extends BaseModel {
    @IsString()
    @Column()
    public ruc: string;

    @IsString()
    @Column({ name: 'razon_social' })
    public razonSocial: string;

    @IsString()
    @Column({ name: 'nombre_comercial' })
    public nombreComercial: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => ContactoModel, (c) => c.empresa)
    @JoinColumn({ name: 'representate' })
    public representante: ContactoModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => UbigeoModel, (u) => u.empresa)
    @JoinColumn({ name: 'id_ubigeo' })
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
    public direccion: string;

    @IsString()
    @Column()
    public urbanizacion: string;

    @IsString()
    @Column({ name: 'telf_fijo' })
    public telfFijo: string;

    @IsString()
    @Column({ name: 'telf_movil' })
    public telfMovil: string;

    @IsString()
    @Column()
    public actividad: string;

    @IsString()
    @Column()
    public email: string;

    @IsString()
    @Column()
    public logo: string;

    @OneToMany((type) => PersonalModel, (p) => p.empresa)
    @Type((t) => PersonalModel)
    personales: PersonalModel[];
}
