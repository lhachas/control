export class Contribuyente {
    private nroDocumento?: string;
    private tipoDocumento?: string;
    private nombreLegal?: string;
    private nombreComercial?: string;
    private ubigeo?: string;
    private direccion?: string;
    private urbanizacion?: string;
    private departamento?: string;
    private provincia?: string;
    private distrito?: string;

    get NroDocumento(): string {
        return this.nroDocumento;
    }
    set NroDocumento(nroDocumento: string) {
        this.nroDocumento = nroDocumento;
    }

    get TipoDocumento(): string {
        return this.tipoDocumento;
    }
    set TipoDocumento(tipoDocumento: string) {
        this.tipoDocumento = tipoDocumento;
    }

    get NombreLegal(): string {
        return this.nombreLegal;
    }
    set NombreLegal(nombreLegal: string) {
        this.nombreLegal = nombreLegal;
    }

    get NombreComercial(): string {
        return this.nombreComercial;
    }
    set NombreComercial(nombreComercial: string) {
        this.nombreComercial = nombreComercial;
    }

    get Ubigeo(): string {
        return this.ubigeo;
    }
    set Ubigeo(ubigeo: string) {
        this.ubigeo = ubigeo;
    }

    get Direccion(): string {
        return this.direccion;
    }
    set Direccion(direccion: string) {
        this.direccion = direccion;
    }

    get Urbanizacion(): string {
        return this.urbanizacion;
    }
    set Urbanizacion(urbanizacion: string) {
        this.urbanizacion = urbanizacion;
    }

    get Departamento(): string {
        return this.departamento;
    }
    set Departamento(departamento: string) {
        this.departamento = departamento;
    }
    
    get Provincia(): string {
        return this.provincia;
    }
    set Provincia(provincia: string) {
        this.provincia = provincia;
    }

    get Distrito(): string {
        return this.distrito;
    }
    set Distrito(distrito: string) {
        this.distrito = distrito;
    }
}    