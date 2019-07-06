export class RespuestaComun {
    protected exito?: boolean;
    protected mensajeError?: string;

    get Exito(): boolean {
        return this.exito;
    }
    set Exito(exito: boolean) {
        this.exito = exito;
    }

    get MensajeError(): string {
        return this.mensajeError;
    }
    set MensajeError(mensajeError: string) {
        this.mensajeError = mensajeError;
    }
}
