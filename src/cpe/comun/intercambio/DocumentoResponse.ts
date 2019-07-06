import { RespuestaComun } from './RespuestaComun';

export class DocumentoResponse extends RespuestaComun {
    protected tramaXmlSinFirma: string;

    get TramaXmlSinFirma(): string {
        // return new Buffer(this.tramaXmlSinFirma, 'base64').toString();
        return this.tramaXmlSinFirma;
    }
    set TramaXmlSinFirma(tramaXmlSinFirma: string) {
        // this.tramaXmlSinFirma = new Buffer(tramaXmlSinFirma).toString('base64');
        this.tramaXmlSinFirma = tramaXmlSinFirma;
    }
}
