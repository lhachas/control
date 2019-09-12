import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'payment_method' })
export class PaymentMethodModel extends BaseModel {
    @Column()
    public method: string;

    @Column()
    @IsString()
    public description: string;
}
