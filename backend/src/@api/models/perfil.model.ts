import { Entity, Column, BeforeInsert, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

import { PersonalModel } from '@control/api/models/personal.model';

@Entity({ name: 'perfil' })
export class PerfilModel extends BaseModel {
    @Column()
    public perfil: string;

    @IsString()
    @Column()
    public imagen: string;

    @IsString()
    @Column()
    public estado: string;

    @OneToOne((type) => PersonalModel, (p) => p.perfil)
    personal: PersonalModel;

    @BeforeInsert()
    async defaultInsert(): Promise<void> {
        this.estado = await 'ACTIVO';
    }
}
