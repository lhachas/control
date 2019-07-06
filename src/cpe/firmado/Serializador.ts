import { xml } from 'xml-serializer-ts';
import * as jszip from 'jszip';
import { IEstructuraXml } from '@comun';
import { DocumentoResponse } from '@comun';

export class Serializador {

    /**
     * Genera el XML basado en una clase con el atributo Serializable
     * @param estructuraXml IEstructura -> Clase a serializar
     * @return Devuelve una cadena Base64 del archivo XML
     * 
     */
    public GenerarXml(estructuraXml: IEstructuraXml): DocumentoResponse {
        const respuesta = new DocumentoResponse();
        try {
            respuesta.TramaXmlSinFirma = xml.serialize(estructuraXml);
            respuesta.Exito = true;
            return respuesta;
        } catch (e) {
            respuesta.Exito = false;
            respuesta.MensajeError = e;
            throw respuesta;
        }
    }
    /**
     * 
     * @Genera el ZIP del XML basandose en la trama del XML.
     * @param=tramaXml -> Cadena Base64 con el contenido del XML
     * @param=nombreArchivo -> Nombre del archivo ZIP
     * @return Devuelve Cadena Base64 del archizo ZIP
     * 
     */
     public async GenerarZip(tramaXml: string, nombreArchivo: string): Promise<string> {
        try {
            const resultado = 'gen';
            const zip = new jszip();
            zip.file(`${nombreArchivo}.xml`, tramaXml);
            const resp = await zip.generateAsync({ type: 'base64' });
            return resp;
        } catch (e) {
            throw e;
        }
    }
}
