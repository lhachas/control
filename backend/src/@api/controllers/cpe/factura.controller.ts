import { Controller, Get, Res, Body } from '@nestjs/common';
import { CDR, DocumentoElectronico, RFirma, RDocumento, PDocumento } from '@fe/common';
import { Factura } from '@fe/xml';
import { DocumentoService } from '@control/api/services/documento.service';

@Controller('factura')
export class FacturaController {

    constructor(private readonly documentoService: DocumentoService) {
        this.documentoService.Tipo = new Factura();
    }

    @Get('Xml')
    async Xml(@Body() documentoElectronico: DocumentoElectronico): Promise<RDocumento> {
        return await this.documentoService.GenerarXml(documentoElectronico);
    }

    @Get('Firmar')
    async FirmarXml(@Body() documentoXml: any): Promise<RFirma> {
        return await this.documentoService.FirmarXml(documentoXml);
    }

    @Get('Enviar')
    async Enviar(@Body() documento: PDocumento): Promise<CDR> {
        return await this.documentoService.Enviar(documento);
    }
}
