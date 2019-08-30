import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'ubigeo' })
export class UbigeoEntity {
    @PrimaryColumn()
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
}
