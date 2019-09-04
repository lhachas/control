import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'tipo_precio' })
export class TipoPrecioModel extends BaseModel {
    @Column()
    public codigo: string;

    @Column()
    @IsString()
    public descripcion: string;

    @Column()
    @IsString()
    public estado: string;

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }
}
