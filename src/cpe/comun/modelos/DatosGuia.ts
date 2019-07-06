import { Contribuyente } from './Contribuyente';

export class DatosGuia {
    private direccionDestino?: Contribuyente;
    private direccionOrigen?: Contribuyente;
    private rucTransportista?: string;
    private tipoDocTransportista?: string;
    private nombreTransportista?: string;
    private nroLicenciaConducir?: string;
    private placaVehiculo?: string;
    private codigoAutorizacion?: string;
    private marcaVehiculo?: string;
    private modoTransporte?: string;
    private unidadMedida?: string;
    private pesoBruto?: number;

    get DireccionDestino(): Contribuyente {
        return this.direccionDestino;
    }
    set DireccionDestino(direccionDestino: Contribuyente) {
        this.direccionDestino = direccionDestino;
    }

    get DireccionOrigen(): Contribuyente {
        return this.direccionOrigen;
    }
    set DireccionOrigen(direccionOrigen: Contribuyente) {
        this.direccionOrigen = direccionOrigen;
    }

    get RucTransportista(): string {
        return this.rucTransportista;
    }
    set RucTransportista(rucTransportista: string) {
        this.rucTransportista = rucTransportista;
    }

    get TipoDocTransportista(): string {
        return this.tipoDocTransportista;
    }
    set TipoDocTransportista(tipoDocTransportista: string) {
        this.tipoDocTransportista = tipoDocTransportista;
    }

    get NombreTransportista(): string {
        return this.nombreTransportista;
    }
    set NombreTransportista(nombreTransportista: string) {
        this.nombreTransportista = nombreTransportista;
    }

    get NroLicenciaConducir(): string {
        return this.nroLicenciaConducir;
    }
    set NroLicenciaConducir(nroLicenciaConducir: string) {
        this.nroLicenciaConducir = nroLicenciaConducir;
    }

    get PlacaVehiculo(): string {
        return this.placaVehiculo;
    }
    set PlacaVehiculo(placaVehiculo: string) {
        this.placaVehiculo = placaVehiculo;
    }

    get CodigoAutorizacion(): string {
        return this.codigoAutorizacion;
    }
    set CodigoAutorizacion(codigoAutorizacion: string) {
        this.codigoAutorizacion = codigoAutorizacion;
    }

    get MarcaVehiculo(): string {
        return this.marcaVehiculo;
    }
    set MarcaVehiculo(marcaVehiculo: string) {
        this.marcaVehiculo = marcaVehiculo;
    }

    get ModoTransporte(): string {
        return this.modoTransporte;
    }
    set ModoTransporte(modoTransporte: string) {
        this.modoTransporte = modoTransporte;
    }

    get UnidadMedida(): string {
        return this.unidadMedida;
    }
    set UnidadMedida(unidadMedida: string) {
        this.unidadMedida = unidadMedida;
    }

    get PesoBruto(): number {
        return this.pesoBruto;
    }
    set PesoBruto(pesoBruto: number) {
        this.pesoBruto = pesoBruto;
    }

    constructor() {
        this.direccionDestino = new Contribuyente();
        this.direccionOrigen = new Contribuyente();
    }
}
