import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn, BeforeInsert } from 'typeorm';
import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { TipoDocumentoEntity } from './tipo-documento.entity';
import { UbigeoEntity } from './ubigeo.entity';

@Entity({ name: 'contacto' })
export class ContactoEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'razon_social' })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    public razonSocial: string;

    @Column({ name: 'nombre_comercial' })
    @IsString()
    @IsNotEmpty()
    public nombreComercial: string;

    @Column()
    @IsString()
    public tipo: string;

    @Column()
    public condicion: string;

    @OneToOne(type => TipoDocumentoEntity)
    @JoinTable()
    @JoinColumn({ name: 'tipo_documento' })
    public tipoDocumento: TipoDocumentoEntity;

    @Column({ name: 'nro_documento' })
    public nroDocumento: string;

    @OneToOne(type => UbigeoEntity)
    @JoinTable()
    public ubigeo: UbigeoEntity;

    @Column()
    public direccion: string;

    @Column()
    @IsString()
    public urbanizacion: string;

    @Column()
    @IsString()
    public departamento: string;

    @Column()
    @IsString()
    public provincia: string;

    @Column()
    @IsString()
    public distrito: string;

    @Column({ name: 'telf_fijo' })
    public telfFijo: string;

    @Column({ name: 'telf_movil' })
    public telfMovil: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @Column()
    @IsString()
    public observaciones: string;

    @Column()
    @IsString()
    public estado: string;

    @BeforeInsert()
    async iniciarInsersion(): Promise<void> {
        this.estado = await 'ACTIVO';
    }

    // constructor(contacto: ContactoEntity) {
    //     this.razonSocial = contacto.razonSocial;
    //     this.nombreComercial = contacto.nombreComercial;
    //     this.tipo = contacto.tipo;
    //     this.condicion = contacto.condicion;
    //     this.tipoDocumento = contacto.tipoDocumento;
    //     this.nroDocumento = contacto.nroDocumento;
    //     this.ubigeo = contacto.ubigeo;
    //     this.direccion = contacto.direccion;
    //     this.urbanizacion = contacto.urbanizacion;
    //     this.departamento = contacto.departamento;
    //     this.provincia = contacto.provincia;
    //     this.distrito = contacto.distrito;
    //     this.telfFijo = contacto.telfFijo;
    //     this.telfMovil = contacto.telfMovil;
    //     this.email = contacto.email;
    //     this.observaciones = contacto.observaciones;
    //     this.estado = contacto.estado;
    // }
}
