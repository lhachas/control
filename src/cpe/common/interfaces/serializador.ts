import { Documento, CDR } from '@common';
import { IEstructuraXml } from './estructuraXml';

export interface ISerializador {
    /**
     * @description Genera el XML basado en una clase con el atributo Serializable
     * @param estructuraXml IEstructura -> Clase a serializar
     * @return Devuelve una cadena Base64 del archivo XML
     * 
     */
    GenerarXml(estructuraXml: IEstructuraXml): Documento;

    /**
     * 
     * @description Genera el ZIP del XML basandose en la trama del XML.
     * @param tramaXml string -> Cadena Base64 con el contenido del XML
     * @param nombreArchivo string -> Nombre del archivo ZIP
     * @return Devuelve Cadena Base64 del archizo ZIP
     * 
     */
    GenerarZip(tramaXml: string, nombreArchivo: string): Promise<string>;

    /**
     * @description Lee la Constancia de Recepción SUNAT y devuelve el contenido
     * @param constanciaRecepcion string
     * @return CDR
     * 
     */
    GenerarDocumentoRespuesta(constanciaRecepcion: string): Promise<CDR>;
}
