export class ConnectionWS {
    private _ws?: string;
    private _ruc?: string;
    private _userSOL?: string;
    private _passwordSOL?: string;
    private _endPoint?: string;

    get ws(): string {
        return this._ws;
    }

    set ws(_ws: string) {
        this._ws = _ws;
    }

    get ruc(): string {
        return this._ruc;
    }

    set ruc(_ruc: string) {
        this._ruc = _ruc;
    }

    get userSOL(): string {
        return this._userSOL;
    }

    set userSOL(_userSOL: string) {
        this.userSOL = _userSOL;
    }

    get passwordSOL(): string {
        return this._passwordSOL;
    }

    set passwordSOL(_passwordSOL: string) {
        this._passwordSOL = _passwordSOL;
    }

    get endPoint(): string {
        return this._endPoint;
    }

    set endPoint(_endPoint: string) {
        this._endPoint = _endPoint;
    }
}
