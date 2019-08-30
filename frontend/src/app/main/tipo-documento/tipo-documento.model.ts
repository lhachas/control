import { FuseUtils } from '@fuse/utils';

export class TipoDocumento
{
    codigo: string;
    descripcion: string;
    abreviatura: string;
    estado: string;

    constructor(tipoDocumento: TipoDocumento)
    {
        {
            this.codigo = tipoDocumento.codigo || '';
            this.descripcion = tipoDocumento.descripcion || '';
            this.abreviatura = tipoDocumento.abreviatura || '';
            this.estado = tipoDocumento.estado || '';
        }
    }
}
