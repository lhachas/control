import { Column, Entity, BeforeInsert } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'currency' })
export class CurrencyModel extends BaseModel {
    @Column()
    public code: string;

    @Column()
    @IsString()
    public description: string;

    @Column()
    @IsString()
    public symbol: string;

    @Column()
    @IsString()
    public country: string;

    @Column({ name: 'exchange_rate' })
    @IsString()
    public exchangeRate: number;
}
