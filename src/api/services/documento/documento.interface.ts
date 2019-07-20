import { CDR, IDocumentoXml } from '@cpe/common';

export interface IDocumento {

    /**
     * @property string
     * Tipo de documento
     * 
     */
    TipoDocumento: IDocumentoXml;
    
    /**
     * @description [Generar] Documento Xml
     * @description [Firmar] Documento Xml
     * @description [Comprimir] Documento Xml generado [.Zip]
     * 
     * 
     * @returns [string] retorna .zip convertido a string [base64]
     * 
     */
    Xml(): Promise<string>;
    
    /**
     * @description [Envia] documento Xml Zipeado
     * 
     * @returns [CDR]
     * 
     */
    Enviar(): Promise<CDR>;
}
