import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';

@Entity({ name: 'credit_note_type' })
export class CreditNoteTypeModel extends BaseModel {
    @Column()
    public code: string;

    @Column()
    @IsString()
    public description: string;
}
