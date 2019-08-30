import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'tipo_operacion' })
export class TipoOperacionEntity {
    @PrimaryColumn()
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
