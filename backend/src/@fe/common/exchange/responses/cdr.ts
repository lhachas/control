import { File } from './file';
import { StatusCDR } from './statusCDR';

export class CDR extends File {
    private _zipCDR: string;
    private _description: string;
    private _code: string;
    private _date: string;
    private _time: string;
    private _status: StatusCDR[];

    get zipCDR(): string {
        return this._zipCDR;
    }
    set zipCDR(_zipCDR: string) {
        this._zipCDR = _zipCDR;
    }

    get description(): string {
        return this._description;
    }
    set description(_description: string) {
        this._description = _description;
    }

    get code(): string {
        return this._code;
    }
    set code(_code: string) {
        this._code = _code;
    }

    get date(): string {
        return this._date;
    }
    set date(_date: string) {
        this._date = _date;
    }

    get time(): string {
        return this._time;
    }
    set time(_time: string) {
        this._time =  _time;
    }

    get status(): StatusCDR[] {
        return this._status;
    }
    set status(_status: StatusCDR[]) {
        this._status = _status;
    }

    constructor() {
        super();
        this.status = new Array<StatusCDR>();
    }
}
