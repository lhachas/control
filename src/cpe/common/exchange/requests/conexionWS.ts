export class ConexionWS {
    private ws?: string;
    private ruc?: string;
    private usuarioSOL?: string;
    private claveSOL?: string;
    private endPoint?: string;

    get WS(): string {
        return this.ws;
    }

    set WS(ws: string) {
        this.ws = ws;
    }

    get RUC(): string {
        return this.ruc;
    }

    set RUC(ruc: string) {
        this.ruc = ruc;
    }

    get UsuarioSOL(): string {
        return this.usuarioSOL;
    }

    set UsuarioSOL(usuarioSOL: string) {
        this.usuarioSOL = usuarioSOL;
    }

    get ClaveSOL(): string {
        return this.claveSOL;
    }

    set ClaveSOL(claveSOL: string) {
        this.claveSOL = claveSOL;
    }

    get EndPoint(): string {
        return this.endPoint;
    }
    
    set EndPoint(endPoint: string) {
        this.endPoint = endPoint;
    }
}
