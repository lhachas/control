export class ErrorWS {
    private _code?: string;
    private _description?: string;

    get code(): string {
        return this._code;
    }
    set code(_code: string) {
        this._code = _code;
    }

    get description(): string {
        return this._description;
    }
    set description(_description: string) {
        this._description = _description;
    }

    constructor(error: any) {
        const { root: { Envelope: { Body: { Fault } } } } = error;
        return {
            code: Fault.detail ? Fault.faultstring : Fault.faultcode,
            description: Fault.detail ? Fault.detail.message : Fault.faultstring,
        } as ErrorWS;
    }
}
