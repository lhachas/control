import { UbigeoDto } from './ubigeo.dto';
import { TipoDocumentoDto } from './document-type.dto';

export class ContactDto {
    public readonly id: number;
    public readonly razonSocial: string;
    public readonly nombreComercial: string;
    public readonly tipo: string;
    public readonly condicion: string;
    public readonly tipoDocumento: string;
    public readonly nroDocumento: string;
    public readonly ubigeo: string;
    public readonly direccion: string;
    public readonly urbanizacion: string;
    public readonly departamento: string;
    public readonly provincia: string;
    public readonly distrito: string;
    public readonly telfFijo: string;
    public readonly telfMovil: string;
    public readonly email: string;
    public readonly observaciones: string;
    public readonly estado: string;

    // constructor() {
    //     this.ubigeo = new UbigeoDto();
    //     this.tipoDocumento = new TipoDocumentoDto();
    // }
}
