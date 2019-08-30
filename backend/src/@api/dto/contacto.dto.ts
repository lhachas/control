import { UbigeoDto } from './ubigeo.dto';
import { TipoDocumentoDto } from './tipo_documento.dto';

export class ContactoDto {
    public readonly id: number;
    public readonly razonSocial: string;
    public readonly nombreComercial: string;
    public readonly tipo: string;
    public readonly condicion: string;
    public readonly tipoDocumento: TipoDocumentoDto;
    public readonly nroDocumento: string;
    public readonly ubigeo: UbigeoDto;
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

    constructor() {
        this.ubigeo = new UbigeoDto();
        this.tipoDocumento = new TipoDocumentoDto();
    }
}
