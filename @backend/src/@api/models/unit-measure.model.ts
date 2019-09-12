import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'unit_measure' })
export class UnitMeasureModel extends BaseModel {
    @PrimaryColumn()
    public unit: string;

    @Column()
    @IsString()
    public description: string;
}
