import { IUser } from '@control/api/interfaces/user.interface';

export interface IAuth {
    token: string;
    user: IUser;
}
