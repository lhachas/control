import {
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsInt, IsDate } from 'class-validator';
import * as DateFormat from 'dateformat';

export abstract class BaseModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsInt()
    @IsNumber()
    @Column({
        name: 'id_usuario_registrado',
        type: 'integer',
        default: 0,
    })
    public idUsuarioRegistrado: number;

    @IsInt()
    @IsNumber()
    @Column({
        name: 'id_usuario_modificado',
        type: 'integer',
        default: 0,
    })
    public idUsuarioModificado: number;

    @IsDate()
    @CreateDateColumn({ precision: null, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public registrado: Date;

    @IsDate()
    @UpdateDateColumn({ precision: null, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public modificado: Date;

    // @BeforeInsert()
    // async defaultInsert(): Promise<void> {
    //     this.registrado = await DateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    // }

    // @BeforeUpdate()
    // async defaultUpdate(): Promise<void> {
    //     this.modificado = await DateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    // }
}
