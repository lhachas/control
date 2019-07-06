export class DocumentoRelacionado {
    private nroDocumento?: string;
    private tipoDocumento?: string;

    get NroDocumento(): string {
        return this.nroDocumento;
    }
    set NroDocumento(nroDocumento: string) {
        this.nroDocumento = nroDocumento;
    }

    get TipoDocumento(): string {
        return this.tipoDocumento;
    }
    set TipoDocumento(tipoDocumento: string) {
        this.tipoDocumento = tipoDocumento;
    }
}
