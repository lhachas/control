import { IBase } from '@control/api/interfaces/base.interface';
import { IStaff } from '@control/api/interfaces/staff.interface';

export interface IUser extends IBase {
    readonly staff: IStaff;
    readonly username: string;
    readonly password: string;
    readonly token: string;
}
