import { IBase } from '@control/api/interfaces/base.interface';

export interface IUbigeo extends IBase {
    readonly ubigeo: string;
    readonly departament: string;
    readonly province: string;
    readonly district: string;
    readonly countryCode: string;
}
