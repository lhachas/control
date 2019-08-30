import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'tipo_nota_debito' })
export class TipoNotaDebitoEntity {
    @PrimaryColumn()
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
