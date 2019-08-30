import { IEstructuraXml } from '@fe/common';
import { DocumentoElectronico } from '@fe/common';

export interface IDocumentoXml {
    Generar(documento: DocumentoElectronico): IEstructuraXml;
}
