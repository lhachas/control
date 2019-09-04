import { Column, Entity, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'moneda' })
export class MonedaModel extends BaseModel {
    @Column()
    public codigo: string;

    @Column()
    @IsString()
    public descripcion: string;

    @Column()
    @IsString()
    public simbolo: string;

    @Column()
    @IsString()
    public pais: string;

    @Column({ name: 'tipo_cambio' })
    @IsString()
    public tipoCambio: number;

    @Column()
    @IsString()
    public estado: string;

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }
}
