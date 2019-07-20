import { Comun } from './comun';

export class Documento extends Comun {
    private tramaXmlSinFirma: string;

    get TramaXmlSinFirma(): string {
        return this.tramaXmlSinFirma;
    }
    set TramaXmlSinFirma(tramaXmlSinFirma: string) {
        this.tramaXmlSinFirma = tramaXmlSinFirma;
    }
}
