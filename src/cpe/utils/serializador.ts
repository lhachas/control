import { xml } from 'xml-serializer-ts';
import * as jszip from 'jszip';
import {Documento, CDR, ISerializador, IEstructuraXml } from '@common';
import { Utils } from '@utils';

export class Serializador implements ISerializador {
    private readonly utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    /**
     * @description Genera el XML basado en una clase con el atributo Serializable
     * @param estructuraXml IEstructura -> Clase a serializar
     * @return Devuelve una cadena Base64 del archivo XML
     * 
     */
    public GenerarXml(estructuraXml: IEstructuraXml): Documento {
        const documento = new Documento();
        try {
            documento.DocumentoXml = xml.serialize(estructuraXml);
            documento.Exito = true;
            return documento;
        } catch (e) {
            documento.Exito = false;
            documento.MensajeError = e;
            documento.Origen = 'GenerarXML';
            throw documento;
        }
    }

    /**
     * 
     * @description Genera el ZIP del XML basandose en la trama del XML.
     * @param tramaXml string -> Cadena Base64 con el contenido del XML
     * @param nombreArchivo string -> Nombre del archivo ZIP
     * @return Devuelve Cadena Base64 del archizo ZIP
     * 
     */
     public async GenerarZip(tramaXml: string, nombreArchivo: string): Promise<string> {
        try {
            const zip = new jszip();
            zip.file(`${nombreArchivo}.xml`, tramaXml);
            return await zip.generateAsync({ type: 'base64' });
        } catch (e) {
            throw e;
        }
    }

    /**
     * @description Lee la Constancia de Recepción SUNAT y devuelve el contenido
     * @param constanciaRecepcion string
     * @return CDR
     * 
     */
    public async GenerarDocumentoRespuesta(constanciaRecepcion: string): Promise<CDR> {
        let cdr = new CDR();
        try {
            const zip = await jszip.loadAsync(constanciaRecepcion, { base64: true });
            const archivos = Object.keys(zip.files);
            if(archivos.length === 0) {
                cdr.MensajeError = 'Respuesta de SUNAT vacio';
                cdr.Exito = false;
            } else {
                for (let i = 0; i < archivos.length; i++) {
                    const nombreArchivo = zip.files[archivos[i]].name;
                    if (!nombreArchivo.endsWith('.xml')) continue;
                    const xmlDoc = await zip.file(nombreArchivo).async('text');
                    cdr = this.utils.getResponseCDR(xmlDoc);
                    cdr.NombreArchivo = nombreArchivo.split('.').shift();
                    cdr.Exito = true;
                }
            }
            return cdr;
        } catch (e) {
            cdr.Exito = false;
            cdr.MensajeError = e;
            cdr.Origen = 'GenerarArchivoCDR';
            throw cdr;
        }
    }
}
