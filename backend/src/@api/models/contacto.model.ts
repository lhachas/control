import { Column, Index, Entity, OneToOne, JoinColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { IsString, IsOptional, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';

import { TipoDocumentoModel } from '@control/api/models/tipo-documento.model';
import { UbigeoModel } from '@control/api/models/ubigeo.model';
import { PersonalModel } from '@control/api/models/personal.model';
import { EmpresaModel } from '@control/api/models/empresa.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'contacto' })
export class ContactoModel extends BaseModel {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @Column({ name: 'razon_social' })
    public razonSocial: string;

    @IsString()
    @IsNotEmpty()
    @Column({ name: 'nombre_comercial' })
    public nombreComercial: string;

    @IsString()
    @Column()
    public tipo: string;

    @IsString()
    @Column()
    public condicion: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => TipoDocumentoModel, (t) => t.contacto)
    @JoinColumn({ name: 'id_tipo_documento' })
    public tipoDocumento: TipoDocumentoModel;

    @Column({ name: 'nro_documento' })
    public nroDocumento: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => UbigeoModel, (u) => u.contacto, { cascade: true})
    @JoinColumn({ name: 'id_ubigeo' })
    public ubigeo: UbigeoModel;

    @Column()
    public direccion: string;

    @IsString()
    @Column()
    public urbanizacion: string;

    @IsString()
    @Column()
    public departamento: string;

    @IsString()
    @Column()
    public provincia: string;

    @IsString()
    @Column()
    public distrito: string;

    @Column({ name: 'telf_fijo' })
    public telfFijo: string;

    @Column({ name: 'telf_movil' })
    public telfMovil: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Column()
    @Index({ unique: true })
    email: string;

    @IsString()
    @Column()
    public observaciones: string;

    @IsString()
    @Column()
    public estado: string;

    @OneToOne((type) => PersonalModel, (p) => p.contacto)
    personal: PersonalModel;

    @OneToOne((type) => EmpresaModel, (e) => e.representante)
    empresa: EmpresaModel;

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }

}
