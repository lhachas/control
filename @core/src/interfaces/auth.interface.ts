import { IUser } from '@core/interfaces/user.interface';

export interface IAuth {
    token: string;
    user: IUser;
}
