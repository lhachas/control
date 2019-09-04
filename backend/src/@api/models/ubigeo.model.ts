import { Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '@control/api/models/base/base.model';

import { ContactoModel } from '@control/api/models/contacto.model';
import { EmpresaModel } from '@control/api/models/empresa.model';

@Entity({ name: 'ubigeo' })
export class UbigeoModel extends BaseModel {
    @Column()
    public ubigeo: string;

    @Column()
    @IsString()
    public departamento: string;

    @Column()
    @IsString()
    public provincia: string;

    @Column()
    @IsString()
    public distrito: string;

    @Column({ name: 'codigo_pais' })
    @IsString()
    public codigoPais: string;

    @OneToOne((type) => ContactoModel, (c) => c.ubigeo)
    @Type((t) => ContactoModel)
    contacto: ContactoModel;

    @OneToOne((type) => EmpresaModel, (e) => e.ubigeo)
    empresa: EmpresaModel;
}
