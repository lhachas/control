import { Comun } from './comun';

export class RFirma extends Comun {
    protected docXmlFirmado?: string;
    protected resumenFirma?: string;
    protected valorFirma?: string;

    get DocumentoXmlFirmado(): string {
        return this.docXmlFirmado;
    }
    set DocumentoXmlFirmado(docXmlFirmado: string) {
        this.docXmlFirmado = docXmlFirmado;
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
