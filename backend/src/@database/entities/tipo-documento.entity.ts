import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';

@Entity({ name: 'tipo_documento' })
export class TipoDocumentoEntity {
    @PrimaryColumn()
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

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }

    // @OneToOne(type => ContactoEntity, contacto => contacto.tipoDocumento)
    // @JoinTable()
    // public contacto: ContactoEntity;

    // constructor(tipoDocumento: TipoDocumentoEntity) {
    //     this.descripcion = tipoDocumento.descripcion;
    //     this.abreviatura = tipoDocumento.abreviatura;
    //     this.estado = tipoDocumento.estado;
    // }
}
