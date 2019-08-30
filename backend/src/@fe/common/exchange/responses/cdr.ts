import { Archivo } from './arhivo';
import { EstadoCDR } from './estadoCDR';

export class CDR extends Archivo {
    private zipCDR: string;
    private descripcion: string;
    private codigo: string;
    private fecha: string;
    private hora: string;
    private estado: EstadoCDR[];

    get ZipCDR(): string {
        return this.zipCDR;
    }
    set ZipCDR(zipCDR: string) {
        this.zipCDR = zipCDR;
    }

    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    get Codigo(): string {
        return this.codigo;
    }
    set Codigo(codigo: string) {
        this.codigo = codigo;
    }

    get Fecha(): string {
        return this.fecha;
    }
    set Fecha(fecha: string) {
        this.fecha = fecha;
    }

    get Hora(): string {
        return this.hora;
    }
    set Hora(hora: string) {
        this.hora =  hora;
    }

    get Estado(): EstadoCDR[] {
        return this.estado;
    }
    set Estado(estado: EstadoCDR[]) {
        this.estado = estado;
    }

    constructor() {
        super();
        this.Estado = new Array<EstadoCDR>();
    }
}    
