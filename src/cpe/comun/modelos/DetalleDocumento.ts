export class DetalleDocumento {
    private id?: number;
    private cantidad?: number;
    private unidadMedida?: string;
    private codigoItem?: string;
    private descripcion?: string;
    private precioUnitario?: number;
    private precioReferencial?: number;
    private tipoPrecio?: string;
    private tipoImpuesto?: string;
    private impuesto?: number;
    private impuestoSelectivo?: number;
    private otroImpuesto?: number;
    private descuento?: number;
    private placaVehiculo?: string;
    private totalVenta?: number;
    private suma?: number;

    get Id(): number {
        return this.id;
    }
    set Id(id: number) {
        this.id = id;
    }
    
    get Cantidad(): number {
        return this.cantidad;
    }
    set Cantidad(cantidad: number) {
        this.cantidad = cantidad;
    }

    get UnidadMedida(): string {
        return this.unidadMedida;
    }
    set UnidadMedida(unidadMedida: string) {
        this.unidadMedida = unidadMedida;
    }

    get CodigoItem(): string {
        return this.codigoItem;
    }
    set CodigoItem(codigoItem: string) {
        this.codigoItem = codigoItem;
    }

    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    get PrecioUnitario(): number {
        return this.precioUnitario;
    }
    set PrecioUnitario(precioUnitario: number) {
        this.precioUnitario = precioUnitario;
    }

    get PrecioReferencial(): number {
        return this.precioReferencial;
    }
    set PrecioReferencial(precioReferencial: number) {
        this.precioReferencial = precioReferencial;
    }

    get TipoPrecio(): string {
        return this.tipoPrecio;
    }
    set TipoPrecio(tipoPrecio: string) {
        this.tipoPrecio = tipoPrecio;
    }

    get TipoImpuesto(): string {
        return this.tipoImpuesto;
    }
    set TipoImpuesto(tipoImpuesto: string) {
        this.tipoImpuesto = tipoImpuesto;
    }

    get Impuesto(): number {
        return this.impuesto;
    }
    set Impuesto(impuesto: number) {
        this.impuesto = impuesto;
    }

    get ImpuestoSelectivo(): number {
        return this.impuestoSelectivo;
    }
    set ImpuestoSelectivo(impuestoSelectivo: number) {
        this.impuestoSelectivo = impuestoSelectivo;
    }

    get OtroImpuesto(): number {
        return this.otroImpuesto;
    }
    set OtroImpuesto(otroImpuesto: number) {
        this.otroImpuesto = otroImpuesto;
    }

    get Descuento(): number {
        return this.descuento;
    }
    set Descuento(descuento: number) {
        this.descuento = descuento;
    }

    get PlacaVehiculo(): string {
        return this.placaVehiculo;
    }
    set PlacaVehiculo(placaVehiculo: string) {
        this.placaVehiculo = placaVehiculo;
    }

    get TotalVenta(): number {
        return this.totalVenta;
    }
    set TotalVenta(totalVenta: number) {
        this.totalVenta = totalVenta;
    }

    get Suma(): number {
        return this.suma;
    }
    set Suma(suma: number) {
        this.suma = suma;
    }

    constructor() {
        this.Id = 1;
        this.UnidadMedida = 'NIU';
        this.TipoPrecio = '01';
        this.TipoImpuesto = '10';
    }
}
