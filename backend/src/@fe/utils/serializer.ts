import { xml } from 'xml-serializer-ts';
import * as jszip from 'jszip';
import { RDocument, CDR } from '@fe/common/exchange';
import { ISerializer, IXmlDocument, IXmlStructure } from '@fe/common/interfaces';
import { Utils } from '@fe/utils';

export class Serializer implements ISerializer {
    private readonly utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    /**
     * @description Genera el XML basado en una clase con el atributo Serializable
     * @param xmlStructure IEstructura -> Clase a serializar
     * @return Devuelve una cadena Base64 del archivo XML
     *
     */
    public xmlGenerate(xmlStructure: IXmlStructure): RDocument {
        const document = new RDocument();
        try {
            document.xmlDocument = xml.serialize(xmlStructure);
            document.success = true;
            return document;
        } catch (e) {
            document.success = false;
            document.message = e;
            document.origin = 'GenerarXML';
            throw document;
        }
    }

    /**
     *
     * @description Genera el ZIP del XML basandose en la trama del XML.
     * @param xml string -> Cadena Base64 con el contenido del XML
     * @param fileName string -> Nombre del archivo ZIP
     * @return Devuelve Cadena Base64 del archizo ZIP
     *
     */
     public async zipGenerate(_xml: string, fileName: string): Promise<string> {
        try {
            const zip = new jszip();
            zip.file(`${fileName}.xml`, _xml);
            return await zip.generateAsync({ type: 'base64' });
        } catch (e) {
            throw e;
        }
    }

    /**
     * @description Lee la Constancia de Recepción SUNAT y devuelve el contenido
     * @param constancy string
     * @return CDR
     *
     */
    public async documentResponseGenerate(constancy: string): Promise<CDR> {
        let cdr = new CDR();
        try {
            const zip = await jszip.loadAsync(constancy, { base64: true });
            const files = Object.keys(zip.files);
            if(files.length === 0) {
                cdr.message = 'Respuesta de SUNAT vacio';
                cdr.success = false;
            } else {
                for (let i = 0; i < files.length; i++) {
                    const fileName = zip.files[files[i]].name;
                    if (!fileName.endsWith('.xml')) continue;
                    const xmlDoc = await zip.file(fileName).async('text');
                    cdr = this.utils.getResponseCDR(xmlDoc);
                    cdr.fileName = fileName.split('.').shift();
                    cdr.success = true;
                }
            }
            return cdr;
        } catch (e) {
            cdr.success = false;
            cdr.message = e;
            cdr.origin = 'GenerarArchivoCDR';
            throw cdr;
        }
    }
}
