import { Controller, Get, Res } from '@nestjs/common';
import { CDR } from '@cpe/common';
import { Factura } from '@cpe/xml';
import { Contribuyente } from 'control-consultas-doc';
import { Documento } from '../../services/documento/documento.service';

@Controller('factura')
export class FacturaController {

    constructor(private readonly documento: Documento) {
        this.documento.TipoDocumento = new Factura();
    }

    @Get('Xml')
    async Xml(): Promise<string> {
        return await this.documento.Xml();
    } 

    @Get('Enviar')
    async Enviar(): Promise<CDR> {
        return await this.documento.Enviar();
    }

    @Get('sunat')
    async Sunat(): Promise<Contribuyente> {
        return await this.documento.getInfo();
    }
}
