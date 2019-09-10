export class PStatusCDR  {
    /**
     * @description
     * Es el ruc del emisor del comprobante de pago a consultar.
     *
     */
    private _voucherRUC: string;

    public get voucherRUC(): string {
        return this._voucherRUC;
    }

    public set voucherRUC(_voucherRUC: string) {
        this._voucherRUC = _voucherRUC;
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
    private _voucherType: string;

    public get voucherType(): string {
        return this._voucherType;
    }

    public set voucherType(_voucherType: string) {
        this._voucherType = _voucherType;
    }

    /**
     * @description
     * Es la serie del comprobante a consultar.
     *
     */
    private _voucherSerie: string;

    public get voucherSerie(): string {
        return this._voucherSerie;
    }

    public set voucherSerie(_voucherSerie: string) {
        this._voucherSerie = _voucherSerie;
    }

    /**
     * @description
     * Es el número de comprobante a consultar.
     *
     */
    private _voucherNumber: string;

    public get voucherNumber(): string {
        return this._voucherNumber;
    }

    public set voucherNumber(_voucherNumber: string) {
        this._voucherNumber = _voucherNumber;
    }
}
