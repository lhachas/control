import { IUser, IStaff } from '@control/core';

export class User implements IUser {
    staff: IStaff;
    token: string;
    state: string;
    createdUserId: number;
    modifiedUserId: number;
    createdAt: Date;
    modifiedAt: Date;
    id: number;
    username: string;
    password: string;
}
