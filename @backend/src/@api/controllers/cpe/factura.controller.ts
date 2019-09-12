import { Controller, Get, Res, Body } from '@nestjs/common';
import { CDR, DocumentoElectronico, RSign, RDocument, PDocument } from '@fe/common';
import { InvoiceXML } from '@fe/xml';
import { CPEService } from '@control/api/services/cpe.service';

@Controller('factura')
export class FacturaController {

    constructor(private readonly cpeService: CPEService) {
        this.cpeService.type = new InvoiceXML();
    }

    @Get('Xml')
    async xml(@Body() document: DocumentoElectronico): Promise<RDocument> {
        return await this.cpeService.xmlGenerate(document);
    }

    @Get('Firmar')
    async signedXml(@Body() documentoXml: any): Promise<RSign> {
        return await this.cpeService.xmlSigned(documentoXml);
    }

    @Get('Enviar')
    async send(@Body() document: PDocument): Promise<CDR> {
        return await this.cpeService.send(document);
    }
}
