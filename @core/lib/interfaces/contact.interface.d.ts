import { IBase } from '@core/interfaces/base.interface';
import { IDocumentType } from '@core/interfaces/document-type.interface';
import { IUbigeo } from '@core/interfaces/ubigeo.interface';
export interface IContact extends IBase {
    readonly businessName: string;
    readonly tradeName: string;
    readonly type: string;
    readonly condition: string;
    readonly documentType: IDocumentType;
    readonly documentNumber: string;
    readonly ubigeo: IUbigeo;
    readonly address: string;
    readonly urbanization: string;
    readonly fixedPhone: string;
    readonly mobilePhone: string;
    readonly email: string;
    readonly observations: string;
}
