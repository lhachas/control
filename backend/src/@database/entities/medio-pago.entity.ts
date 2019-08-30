import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'medio_pago' })
export class MedioPagoEntity {
    @PrimaryColumn()
    public medio: string;

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
