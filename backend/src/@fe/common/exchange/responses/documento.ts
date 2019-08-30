import { Comun } from './comun';

export class RDocumento extends Comun {
    private documentoXml: string;

    get DocumentoXml(): string {
        return this.documentoXml;
    }
    set DocumentoXml(documentoXml: string) {
        this.documentoXml = documentoXml;
    }
}
