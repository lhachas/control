import { ErrorWS } from './errorWS';

export class Comun {
    private exito?: boolean;
    private mensajeError?: string;
    private errorWS: ErrorWS;
    private origen?: string;

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

    get ErrorWS(): ErrorWS {
        return this.errorWS;
    }
    set ErrorWS(errorWS: ErrorWS) {
        this.errorWS = errorWS;
    }

    get Origen(): string {
        return this.origen;
    }
    set Origen(origen: string) {
        this.origen = origen;
    }
}
