import { IBase } from '@core/interfaces/base.interface';
import { IStaff } from '@core/interfaces/staff.interface';

export interface IUser extends IBase {
    readonly staff: IStaff;
    readonly username: string;
    readonly password: string;
    readonly token: string;
}
