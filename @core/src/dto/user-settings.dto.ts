import { IsNotEmpty, IsNumber, IsJSON } from 'class-validator';

export class UserSettingDto {
    @IsNumber()
    @IsNotEmpty()
    public readonly id: number;

    @IsJSON()
    public readonly settings: {
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
}
