export class StatusCDR { 
    /**
     * @description
     * Es el ruc del emisor del comprobante de pago a consultar.
     * 
     */
    public rucComprobante: string;

    /**
     * @description
     * Es el tipo de comprobante a consultar.
     * @example
     * [01: Factura.]
     * [07: Nota de crédito.]
     * [08: Nota de débito.]
     * 
     */
    public tipoComprobante: string;

    /**
     * @description
     * Es la serie del comprobante a consultar.
     * 
     */
    public serieComprobante: string;

    /**
     * @description
     * Es el número de comprobante a consultar.
     * 
     */
    public numeroComprobante: string;
}
