import { Column, Entity, BeforeInsert, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '@control/api/models/base/base.model';

import { ContactoModel } from '@control/api/models/contacto.model';

@Entity({ name: 'tipo_documento' })
export class TipoDocumentoModel extends BaseModel {
    @Column()
    public codigo: string;

    @Column()
    @IsString()
    public descripcion: string;

    @Column()
    @IsString()
    public abreviatura: string;

    @Column()
    @IsString()
    public estado: string;

    @OneToOne((type) => ContactoModel, (c) => c.tipoDocumento)
    @Type((t) => ContactoModel)
    contacto: ContactoModel;

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }
}
