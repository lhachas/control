import { ErrorWS } from './errorWS';

export class Comun {
    private _success?: boolean;
    private _message?: string;
    private _errorWS: ErrorWS;
    private _origin?: string;

    get success(): boolean {
        return this._success;
    }
    set success(_success: boolean) {
        this._success = _success;
    }

    get message(): string {
        return this._message;
    }
    set message(_message: string) {
        this._message = _message;
    }

    get errorWS(): ErrorWS {
        return this._errorWS;
    }
    set errorWS(_errorWS: ErrorWS) {
        this._errorWS = _errorWS;
    }

    get origin(): string {
        return this._origin;
    }
    set origin(_origin: string) {
        this._origin = _origin;
    }
}
