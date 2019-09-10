import { IXmlStructure } from '@fe/common';
import { DocumentoElectronico } from '@fe/common';

export interface IXmlDocument {
    generate(document: DocumentoElectronico): IXmlStructure;
}
