import { IEstructuraXml } from 'src/cpe/common';
import { DocumentoElectronico } from 'src/cpe/common';

export interface IDocumentoXml {
    Generar(documento: DocumentoElectronico): IEstructuraXml;
}
