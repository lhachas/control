import { Column, Entity, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'tipo_operacion' })
export class TipoOperacionModel extends BaseModel {
    @Column()
    public operacion: string;

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
