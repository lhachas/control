import { Column, Entity, PrimaryColumn, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'voucher_type' })
export class VoucherTypeModel extends BaseModel {
    @Column()
    public code: string;

    @Column()
    @IsString()
    public description: string;

    @Column()
    @IsString()
    public abbreviation: string;
}
