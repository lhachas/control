export interface IBase {
    readonly id: number;
    readonly state: string;
    readonly createdUserId: number;
    readonly modifiedUserId: number;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}
