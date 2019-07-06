import { RespuestaComun } from './RespuestaComun';

export class FirmadoResponse extends RespuestaComun {
    protected tramaXmlFirmado?: string;
    protected resumenFirma?: string;
    protected valorFirma?: string;

    get TramaXmlFirmado(): string {
        // return new Buffer(this.tramaXmlFirmado, 'base64').toString();
        return this.tramaXmlFirmado;
    }
    set TramaXmlFirmado(tramaXmlFirmado: string) {
        // this.tramaXmlFirmado = new Buffer(tramaXmlFirmado).toString('base64');
        this.tramaXmlFirmado = tramaXmlFirmado;
    }

    get ResumenFirma(): string {
        return this.resumenFirma;
    }
    set ResumenFirma(resumenFirma: string) {
        this.resumenFirma = resumenFirma;
    }

    get ValorFirma(): string {
        return this.valorFirma;
    }
    set ValorFirma(valorFirma: string) {
        this.valorFirma = valorFirma;
    }
}
