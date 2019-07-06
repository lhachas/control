import { IEstructuraXml } from '@comun';
import { DocumentoElectronico } from '@comun';

export interface IDocumentoXml {
    Generar(documento: DocumentoElectronico): IEstructuraXml;
}
