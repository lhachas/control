import { CDR, IDocumentoXml, DocumentoElectronico, PDocumento } from '@fe/common';

export interface IDocumento {

    /**
     * @property string
     * Tipo de documento
     *  @ejemplo
     * [Factura][Boleta][NotaCredito][NotaDebito]
     */
    Tipo: IDocumentoXml;

    /**
     * @description [Generar] Documento Xml
     * @description [Firmar] Documento Xml
     * @description [Comprimir] Documento Xml generado [.Zip]
     *
     *
     * @returns [string]
     * retorna .zip convertido a string [base64]
     */
    Xml(documentoDto: DocumentoElectronico): Promise<string>;

    /**
     * @description [Envia] documento Xml Zipeado
     *
     * @returns [CDR]
     * @CDR [contancia de recepción]
     */
    Enviar(documento: PDocumento): Promise<CDR>;
}
