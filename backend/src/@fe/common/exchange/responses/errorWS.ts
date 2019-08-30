export class ErrorWS {
    private codigo?: string;
    private descripcion?: string;

    get Codigo(): string {
        return this.codigo;
    }
    set Codigo(codigo: string) {
        this.codigo = codigo;
    }

    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    constructor(error: any) {
        const { root: { Envelope: { Body: { Fault } } } } = error;
        return {
            Codigo: Fault.detail ? Fault.faultstring : Fault.faultcode,
            Descripcion: Fault.detail ? Fault.detail.message : Fault.faultstring,
        } as ErrorWS;
    }
}
