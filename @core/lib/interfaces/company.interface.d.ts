import { IBase } from '@core/interfaces/base.interface';
import { IUbigeo } from '@core/interfaces/ubigeo.interface';
export interface ICompany extends IBase {
    readonly ruc: string;
    readonly businessName: string;
    readonly tradeName: string;
    readonly representative: string;
    readonly ubigeo: IUbigeo;
    readonly arigv: string;
    readonly apvi: string;
    readonly apcl: string;
    readonly address: string;
    readonly urbanization: string;
    readonly fixedPhone: string;
    readonly mobilePhone: string;
    readonly activity: string;
    readonly email: string;
    readonly logo: string;
}
