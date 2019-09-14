import {
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeRemove,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsInt, IsOptional, IsNotEmpty, IsDate, IsString } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export abstract class BaseModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ default: 'ACTIVO' })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString()
    @IsNotEmpty()
    public status: string;

    @IsInt()
    @IsNumber()
    @Column({
        name: 'created_user_id',
        type: 'integer',
        default: 0,
    })
    public createdUserId: number;

    @IsInt()
    @IsNumber()
    @Column({
        name: 'modified_user_id',
        type: 'integer',
        default: 0,
    })
    public modifiedUserId: number;

    @IsDate()
    @CreateDateColumn({
        name: 'created_at',
        precision: null,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public createdAt: Date;

    @IsDate()
    @UpdateDateColumn({
        name: 'modified_at',
        precision: null,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public modifiedAt: Date;

    @BeforeInsert()
    async default(): Promise<void> {
        this.status = await 'ACTIVO';
    }

    @BeforeRemove()
    async b4block() {
        this.status = 'INACTIVO';
    }
}
