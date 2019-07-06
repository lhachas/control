export class DatoAdicional {
    private codigo?: string;
    private contenido?: string;

    get Codigo(): string {
        return this.codigo;
    }
    set Codigo(codigo: string) {
        this.codigo = codigo;
    }

    get Contenido(): string {
        return this.contenido;
    }
    set Contenido(contenido: string) {
        this.contenido = contenido;
    }
}
