import { CDR, IXmlDocument, DocumentoElectronico, PDocument } from '@fe/common';

export interface ICPE {

    /**
     * @property string
     * Tipo de documento
     *  @ejemplo
     * [Factura][Boleta][NotaCredito][NotaDebito]
     */
    type: IXmlDocument;

    /**
     * @description [Generar] Documento Xml
     * @description [Firmar] Documento Xml
     * @description [Comprimir] Documento Xml generado [.Zip]
     *
     *
     * @returns [string]
     * retorna .zip convertido a string [base64]
     */
    xml(documentDto: DocumentoElectronico): Promise<string>;

    /**
     * @description [Envia] documento Xml Zipeado
     *
     * @returns [CDR]
     * @CDR [contancia de recepción]
     */
    send(document: PDocument): Promise<CDR>;
}
