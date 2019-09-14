export interface IBase {
    readonly id: number;
    readonly status: string;
    readonly createdUserId: number;
    readonly modifiedUserId: number;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}
