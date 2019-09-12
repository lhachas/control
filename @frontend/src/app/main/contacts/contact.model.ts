import { ControlUtils } from '@control/utils';

export class Contact
{
    id: number;
    avatar: string;
    razonSocial: string;
    nombreComercial: string;
    tipo: string;
    condicion: string;
    tipoDocumento: string;
    nroDocumento: string;
    ubigeo: string;
    direccion: string;
    urbanizacion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    telfFijo: string;
    telfMovil: string;
    email: string;
    observaciones: string;
    estado: string;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || 0;
            this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
            this.razonSocial = contact.razonSocial || '';
            this.nombreComercial = contact.nombreComercial || '';
            this.tipo = contact.tipo || '';
            this.condicion = contact.condicion || '';
            this.tipoDocumento = contact.tipoDocumento || '';
            this.nroDocumento = contact.nroDocumento || '';
            this.ubigeo = contact.ubigeo || '';
            this.direccion = contact.direccion || '';
            this.urbanizacion = contact.urbanizacion || '';
            this.departamento = contact.departamento || '';
            this.provincia = contact.provincia || '';
            this.distrito = contact.distrito || '';
            this.telfFijo = contact.telfFijo || '';
            this.telfMovil = contact.telfMovil || '';
            this.email = contact.email || '';
            this.observaciones = contact.observaciones || '';
            this.estado = contact.estado || '';
        }
    }
}
