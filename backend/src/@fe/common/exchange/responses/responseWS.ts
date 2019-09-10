import { Comun } from './comun';

export class ResponseWS extends Comun {
    private _constancyOfRecepty?: string;
    private _ticket?: string;

    /**
     * @descripcion
     * El documento electrónico de respuesta de SUNAT para todos los documentos
     * electrónicos enviados es la Constancia de Recepción (CDR).
     * Este documento informa al emisor el resultado del envío, y podrá tener
     * el estado de aceptada o rechazada. Las implicancias de la aceptación o rechazo
     * se explican en el numeral 4.1 del presente manual.
     *
     */
    get constancyOfRecepty(): string {
        return this._constancyOfRecepty;
    }

    set constancyOfRecepty(_constancyOfRecepty: string) {
        this._constancyOfRecepty = _constancyOfRecepty;
    }

    /**
     * @descripcion
     * ticket con el que posteriormente utilizando el método getStatus
     * se puede obtener la constancia de aceptación o rechazo de cada documento.
     */
    get ticket(): string {
        return this._ticket;
    }

    set ticket(_ticket: string) {
        this._ticket = _ticket;
    }
}
