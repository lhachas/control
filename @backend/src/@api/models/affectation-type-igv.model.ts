import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'affectation_type_igv' })
export class AffectationTypeIGVModel extends BaseModel {
    @IsString()
    @Column()
    public code: string;

    @Column()
    @IsString()
    public description: string;
}
