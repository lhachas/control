import { IBase } from '@core/interfaces/base.interface';
export interface IRole extends IBase {
    readonly rolename: string;
    readonly image: string;
}
