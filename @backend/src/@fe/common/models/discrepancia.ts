export class Discrepancia {
    private nroReferencia?: string;
    private tipo?: string;
    private descripcion?: string;

    get NroReferencia(): string {
        return this.nroReferencia;
    }
    set NroReferencia(nroReferencia: string) {
        this.nroReferencia = nroReferencia;
    }

    get Tipo(): string {
        return this.tipo;
    }
    set Tipo(tipo: string) {
        this.tipo = tipo;
    }

    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
}
