export class PEstadoCDR  {
    /**
     * @description
     * Es el ruc del emisor del comprobante de pago a consultar.
     * 
     */
    private rucComprobante: string;

    public get RucComprobante(): string {
        return this.rucComprobante;
    }

    public set RucComprobante(rucComprobante: string) {
        this.rucComprobante = rucComprobante;
    }

    /**
     * @description
     * Es el tipo de comprobante a consultar.
     * @example
     * [01: Factura.]
     * [07: Nota de crédito.]
     * [08: Nota de débito.]
     * 
     */
    private tipoComprobante: string;
    
    public get TipoComprobante(): string {
        return this.tipoComprobante;
    }

    public set TipoComprobante(tipoComprobante: string) {
        this.tipoComprobante = tipoComprobante;
    }

    /**
     * @description
     * Es la serie del comprobante a consultar.
     * 
     */
    private serieComprobante: string;

    public get SerieComprobante(): string {
        return this.serieComprobante;
    }

    public set SerieComprobante(serieComprobante: string) {
        this.serieComprobante = serieComprobante;
    }

    /**
     * @description
     * Es el número de comprobante a consultar.
     * 
     */
    private numeroComprobante: string;

    public get NumeroComprobante(): string {
        return this.numeroComprobante;
    }

    public set NumeroComprobante(numeroComprobante: string) {
        this.numeroComprobante = numeroComprobante;
    }
}
