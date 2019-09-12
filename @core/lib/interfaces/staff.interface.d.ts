import { IBase } from '@core/interfaces/base.interface';
import { IRole } from '@core/interfaces/role.interface';
import { IContact } from '@core/interfaces/contact.interface';
import { ICompany } from '@core/interfaces/company.interface';
export interface IStaff extends IBase {
    readonly role: IRole;
    readonly contact: IContact;
    readonly company: ICompany;
}
