import { Column, Entity, OneToOne } from 'typeorm';
import { IsJSON } from 'class-validator';
import { BaseModel } from '@control/api/models/base/base.model';
import { UserModel } from '@control/api/models/user.model';

@Entity({ name: 'user_settings' })
export class UserSettingsModel extends BaseModel {
    @IsJSON()
    @Column('simple-json')
    public settings: {
        colorTheme: string;
        customScrollbars: boolean;
        layout: {
            style: string,
            width: 'fullwidth' | 'boxed',
            navbar: {
                primaryBackground: string,
                secondaryBackground: string,
                hidden: boolean,
                folded: boolean,
                position: 'left' | 'right' | 'top',
                variant: string,
            },
            toolbar: {
                customBackgroundColor: boolean,
                background: string,
                hidden: boolean,
                position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed',
            }
            footer: {
                customBackgroundColor: boolean,
                background: string,
                hidden: boolean,
                position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed',
            },
            sidepanel: {
                hidden: boolean,
                position: 'left' | 'right',
            },
        }
    };

    @OneToOne((type) => UserModel, (u) => u.setting)
    public user: UserModel;
}
