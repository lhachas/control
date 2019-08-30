/**
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */
import {
    Entity,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    BeforeRemove,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { hash, compare } from 'bcrypt';
import {
    IsString,
    IsNotEmpty,
    Length,
    MinLength,
    IsEmail,
    IsBoolean,
} from 'class-validator';

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    clave: string;

    @Column()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Index({ unique: true })
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    rol: string;

    @Column({ default: 'ACTIVO' })
    @IsString()
    @IsNotEmpty()
    estado: string;

    @CreateDateColumn({ type: 'timestamp' })
    registrado: string;

    @UpdateDateColumn({ type: 'timestamp' })
    modificado: string;

    @BeforeInsert()
    async b4register() {
        this.rol = await 'MEMBER';
        this.estado = await 'ACTIVO';
        this.clave = await hash(this.clave, 10);
    }

    @BeforeUpdate()
    async b4update() {
        this.clave = await hash(this.clave, 10);
    }

    @BeforeRemove()
    async b4block() {
        this.estado = 'INACTIVO';
    }

    async validaClave(clave) {
        return await compare(clave, this.clave);
    }
}
