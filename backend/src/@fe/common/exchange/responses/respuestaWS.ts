import { Comun } from './comun';

export class RespuestaWS extends Comun {
    private constanciaDeRecepcion?: string;
    private ticket?: string;

    /**
     * @descripcion
     * El documento electrónico de respuesta de SUNAT para todos los documentos
     * electrónicos enviados es la Constancia de Recepción (CDR). 
     * Este documento informa al emisor el resultado del envío, y podrá tener
     * el estado de aceptada o rechazada. Las implicancias de la aceptación o rechazo
     * se explican en el numeral 4.1 del presente manual.
     * 
     */
    get ConstanciaDeRecepcion(): string {
        return this.constanciaDeRecepcion;
    }

    set ConstanciaDeRecepcion(constanciaDeRecepcion: string) {
        this.constanciaDeRecepcion = constanciaDeRecepcion;
    }

    /**
     * @descripcion
     * ticket con el que posteriormente utilizando el método getStatus
     * se puede obtener la constancia de aceptación o rechazo de cada documento.
     */
    get Ticket(): string {
        return this.ticket;
    }

    set Ticket(ticket: string) {
        this.ticket = ticket;
    }
}
