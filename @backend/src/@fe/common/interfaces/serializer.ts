import { RDocument, CDR } from '@fe/common/exchange';
import { IXmlStructure } from './xml-structure';

export interface ISerializer {
    /**
     * @description Genera el XML basado en una clase con el atributo Serializable
     * @param xmlStructure IEstructura -> Clase a serializar
     * @return Devuelve una cadena Base64 del archivo XML
     *
     */
    xmlGenerate(xmlStructure: IXmlStructure): RDocument;

    /**
     *
     * @description Genera el ZIP del XML basandose en la trama del XML.
     * @param xml string -> Cadena Base64 con el contenido del XML
     * @param fileName string -> Nombre del archivo ZIP
     * @return Devuelve Cadena Base64 del archizo ZIP
     *
     */
    zipGenerate(xml: string, fileName: string): Promise<string>;

    /**
     * @description Lee la Constancia de Recepción SUNAT y devuelve el contenido
     * @param constancy string
     * @return CDR
     *
     */
    documentResponseGenerate(constancy: string): Promise<CDR>;
}
