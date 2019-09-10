import { ContactService } from './contact.service';
import { CPEService } from './cpe.service';
import { SunatService } from './ruc.service';
import { DocumentTypeService } from './document-type.service';
import { UbigeoService } from './ubigeo.service';
import { UserService } from './user.service';

export const ControlServices = [
    ContactService,
    CPEService,
    SunatService,
    UbigeoService,
    DocumentTypeService,
    UserService,
];
