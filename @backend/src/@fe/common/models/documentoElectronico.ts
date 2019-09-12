import { Contribuyente } from './Contribuyente';
import { DetalleDocumento } from './DetalleDocumento';
import { DatoAdicional } from './DatoAdicional';
import { DatosGuia } from './DatosGuia';
import { DocumentoRelacionado } from './DocumentoRelacionado';
import { Discrepancia } from './Discrepancia';

export class DocumentoElectronico {
    private idDocumento?: string;
    private serie?: string;
    private correlativo?: string;
    private tipoDocumento?: string;
    private emisor?: Contribuyente;
    private receptor?: Contribuyente;
    private fechaEmision?: string;
    private moneda?: string;
    private tipoOperacion?: string;
    private gravadas?: number;
    private gratuitas?: number;
    private inafectas?: number;
    private exoneradas?: number;
    private descuentoGoblal?: number;
    private items?: DetalleDocumento[];
    private totalVenta?: number;
    private totalIgv?: number;
    private totalIsc?: number;
    private totalOtrosTributos?: number;
    private montoLetras?: string;
    private placaVehiculo?: string;
    private montoPercepcion?: number;
    private montoDetraccion?: number;
    private datosAdicionales?: DatoAdicional[];
    private tipoDocAnticipo?: string;
    private docAnticipo?: string;
    private monedaAnticipo?: string;
    private montoAnticipo?: number;
    private datosGuiaTransportista?: DatosGuia;
    private relacionados?: DocumentoRelacionado[];
    private otrosDocumentosRelacionados?: DocumentoRelacionado[];
    private discrepancias?: Discrepancia[];
    private nroOrdenCompra?: string;
    private calculoIgv: number;
    private calculoIsc: number;
    private calculoDetraccion: number;

    get IdDocumento(): string {
        return this.idDocumento;
    }

    set IdDocumento(idDocumento: string) {
        this.idDocumento = idDocumento;
    }

    get Serie(): string {
        return this.serie;
    }

    set Serie(serie: string) {
        this.serie = serie;
    }

    get Correlativo(): string {
        return this.correlativo;
    }

    set Correlativo(correlativo: string) {
        this.correlativo = correlativo;
    }

    get TipoDocumento(): string {
        return this.tipoDocumento;
    }

    set TipoDocumento(tipoDocumento: string) {
        this.idDocumento = this.idDocumento;
    }

    get Emisor(): Contribuyente {
        return this.emisor;
    }

    set Emisor(emisor: Contribuyente) {
        this.emisor = emisor;
    }

    get Receptor(): Contribuyente {
        return this.receptor;
    }

    set Receptor(receptor: Contribuyente) {
        this.receptor = receptor;
    }

    get FechaEmision(): string {
        return this.fechaEmision;
    }

    set FechaEmision(fechaEmision: string) {
        this.fechaEmision = fechaEmision;
    }

    get Moneda(): string {
        return this.moneda;
    }

    set Moneda(moneda: string) {
        this.moneda = moneda;
    }

    get TipoOperacion(): string {
        return this.tipoOperacion;
    }

    set TipoOperacion(tipoOperacion: string) {
        this.tipoOperacion = tipoOperacion;
    }

    get Gravadas(): number {
        return this.gravadas;
    }

    set Gravadas(gravadas: number) {
        this.gravadas = gravadas;
    }

    get Gratuitas(): number {
        return this.gratuitas;
    }

    set Gratuitas(gratuitas: number) {
        this.gratuitas = gratuitas;
    }

    get Inafectas(): number {
        return this.inafectas;
    }

    set Inafectas(inafectas: number) {
        this.inafectas = inafectas;
    }

    get Exoneradas(): number {
        return this.exoneradas;
    }

    set Exoneradas(exooneradas: number) {
        this.exoneradas = exooneradas;
    }

    get DescuentoGlobal(): number {
        return this.descuentoGoblal;
    }

    set DescuentoGlobal(descuentoGoblal: number) {
        this.descuentoGoblal = descuentoGoblal;
    }

    get Items(): DetalleDocumento[] {
        return this.items;
    }

    set Items(items: DetalleDocumento[]) {
        this.items = items;
    }

    get TotalVenta(): number {
        return this.totalVenta;
    }

    set TotalVenta(totalVenta: number) {
        this.totalVenta = totalVenta;
    }

    get TotalIgv(): number {
        return this.totalIgv;
    }

    set TotalIgv(totalIgv: number) {
        this.totalIgv = totalIgv;
    }

    get TotalIsc(): number {
        return this.totalIsc;
    }

    set TotalIsc(totalIsc: number) {
        this.totalIsc = totalIsc;
    }

    get TotalOtrosTributos(): number {
        return this.totalOtrosTributos;
    }

    set TotalOtrosTributos(totalOtrosTributos: number) {
        this.totalOtrosTributos = totalOtrosTributos;
    }

    get MontoEnLetras(): string {
        return this.montoLetras;
    }

    set MontoEnLetras(montoLetras: string) {
        this.montoLetras = montoLetras;
    }

    get PlacaVehiculo(): string {
        return this.placaVehiculo;
    }

    set PlacaVehiculo(placaVehiculo: string) {
        this.placaVehiculo = placaVehiculo;
    }

    get MontoPercepcion(): number {
        return this.montoPercepcion;
    }

    set MontoPercepcion(montoPercepcion: number) {
        this.MontoPercepcion = montoPercepcion;
    }

    get MontoDetraccion(): number {
        return this.montoDetraccion;
    }

    set MontoDetraccion(montoDetraccion: number) {
        this.montoDetraccion = montoDetraccion;
    }

    get DatoAdicionales(): DatoAdicional[] {
        return this.datosAdicionales;
    }

    set DatoAdicionales(datosAdicionales: DatoAdicional[]) {
        this.datosAdicionales = datosAdicionales;
    }

    get TipoDocAnticipo(): string {
        return this.tipoDocAnticipo;
    }

    set TipoDocAnticipo(tipoDocAnticipo: string) {
        this.tipoDocAnticipo = tipoDocAnticipo;
    }

    get DocAnticipo(): string {
        return this.docAnticipo;
    }

    set DocAnticipo(docAnticipo: string) {
        this.docAnticipo = docAnticipo;
    }

    get MonedaAnticipo(): string {
        return this.monedaAnticipo;
    }

    set MonedaAnticipo(monedaAnticipo: string) {
        this.monedaAnticipo = monedaAnticipo;
    }

    get MontoAnticipo(): number {
        return this.montoAnticipo;
    }

    set MontoAnticipo(montoAnticipo: number) {
        this.montoAnticipo = montoAnticipo;
    }

    get DatosGuiaTransportista(): DatosGuia {
        return this.datosGuiaTransportista;
    }

    set DatosGuiaTransportista(datosGuiaTransportista: DatosGuia) {
        this.datosGuiaTransportista = datosGuiaTransportista;
    }

    get Relacionados(): DocumentoRelacionado[] {
        return this.relacionados;
    }
    set Relacionados(relacionados: DocumentoRelacionado[]) {
        this.relacionados = relacionados;
    }

    get OtrosDocumentosRelacionados(): DocumentoRelacionado[] {
        return this.otrosDocumentosRelacionados;
    }

    set OtrosDocumentosRelacionados(otrosDocumentosRelacionados: DocumentoRelacionado[]) {
        this.otrosDocumentosRelacionados = otrosDocumentosRelacionados;
    }

    get Discrepancias(): Discrepancia[] {
        return this.discrepancias;
    }

    set Discrepancias(discrepancias: Discrepancia[]) {
        this.discrepancias = discrepancias;
    }

    get NroOrdenCompra(): string {
        return this.nroOrdenCompra;
    }

    set NroOrdenCompra(nroOrdenCompra: string) {
        this.nroOrdenCompra = nroOrdenCompra;
    }

    get CalculoIgv(): number {
        return this.calculoIgv;
    }

    set CalculoIgv(calculoIgv: number) {
        this.calculoIgv = calculoIgv;
    }

    get CalculoIsc(): number {
        return this.calculoIsc;
    }

    set CalculoIsc(calculoIsc: number) {
        this.calculoIsc = calculoIsc;
    }

    get CalculoDetraccion(): number {
        return this.calculoDetraccion;
    }

    set CalculoDetraccion(calculoDetraccion: number) {
        this.calculoDetraccion = calculoDetraccion;
    }

    constructor() {
        this.Emisor = {
            TipoDocumento: '6',
        } as Contribuyente;

        this.Receptor = {
            TipoDocumento: '6',
        } as Contribuyente;

        this.calculoIgv = 0.18;
        this.CalculoIsc = 0.10;
        this.Items = new Array<DetalleDocumento>();
        this.DatoAdicionales = new Array<DatoAdicional>();
        this.Relacionados = new Array<DocumentoRelacionado>();
        this.OtrosDocumentosRelacionados = new Array<DocumentoRelacionado>();
        this.Discrepancias = new Array<Discrepancia>();
        this.TipoDocumento = '01';
        this.TipoOperacion = '01';
        this.Moneda = 'PEN';
        this.MontoEnLetras = '';
    }

    public fileName(): string {
        const nombre: string[] = [
            this.Emisor.NroDocumento,
            this.TipoDocumento,
            this.Serie,
            this.Correlativo,
        ];
        return nombre.join('-');
    }
}
