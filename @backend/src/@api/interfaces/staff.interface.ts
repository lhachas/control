import { IBase } from '@control/api/interfaces/base.interface';
import { IRole } from '@control/api/interfaces/role.interface';
import { IContact } from '@control/api/interfaces/contact.interface';
import { ICompany } from '@control/api/interfaces/company.interface';

export interface IStaff extends IBase {
    readonly role: IRole;
    readonly contact: IContact;
    readonly company: ICompany;
}
