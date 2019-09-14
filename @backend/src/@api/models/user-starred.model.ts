import { Column, Entity, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { IsJSON, IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseModel } from '@control/api/models/base/base.model';
import { UserModel } from '@control/api/models/user.model';
import { ContactModel } from '@control/api/models/contact.model';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: 'user_settings' })
export class UserStarredModel extends BaseModel {
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => UserModel, (t) => t.starred, { cascade: true })
    @JoinColumn({ name: 'user_id' })
    public user: UserModel;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @OneToOne((type) => ContactModel, (c) => c.starred, { cascade: true })
    @JoinColumn({ name: 'contact_id' })
    public contact: ContactModel;
}
