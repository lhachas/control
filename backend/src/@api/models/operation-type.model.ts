import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'operation_type' })
export class OperationTypeModel extends BaseModel {
    @Column()
    public operation: string;

    @Column()
    @IsString()
    public description: string;
}
