import { IBase } from '@core/interfaces/base.interface';
import { IStaff } from '@core/interfaces/staff.interface';

export interface IUser extends IBase {
    readonly staff: IStaff;
    readonly username: string;
    readonly password: string;
    readonly token: string;
    readonly settings: string;
    // readonly settings: {
    //     colorTheme: string;
    //     customScrollbars: boolean;
    //     layout: {
    //         style: string,
    //         width: 'fullwidth' | 'boxed',
    //         navbar: {
    //             primaryBackground: string,
    //             secondaryBackground: string,
    //             hidden: boolean,
    //             folded: boolean,
    //             position: 'left' | 'right' | 'top',
    //             variant: string,
    //         },
    //         toolbar: {
    //             customBackgroundColor: boolean,
    //             background: string,
    //             hidden: boolean,
    //             position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed',
    //         }
    //         footer: {
    //             customBackgroundColor: boolean,
    //             background: string,
    //             hidden: boolean,
    //             position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed',
    //         },
    //         sidepanel: {
    //             hidden: boolean,
    //             position: 'left' | 'right',
    //         },
    //     }
    // };
    readonly starred: string;
    readonly frequent: string;
}
