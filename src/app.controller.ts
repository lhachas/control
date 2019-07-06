import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NotaCredito, FirmadoRequest } from '@cpe';
import { Documento } from './documento';
import { Certificador, Serializador } from '@cpe';
import * as fs from 'fs';
import * as path from 'path';
import * as soap from 'soap';

@Controller()
export class AppController {
    // private readonly certificador: Certificador;
    private readonly notaCredito: NotaCredito;
    private readonly serializador: Serializador;
    private readonly request: FirmadoRequest;
    constructor(private readonly appService: AppService, private readonly certificador: Certificador) {
        this.notaCredito = new NotaCredito();
        this.serializador = new Serializador();
        this.request = new FirmadoRequest();
     }

    @Get()
    async getHello(): Promise<string> {
        try {
            const notaCredito = this.notaCredito.Generar(Documento);
            const generar = this.serializador.GenerarXml(notaCredito);
            this.request.TramaXmlSinFirma = generar.TramaXmlSinFirma;
            this.request.UnSoloNodoExtension = true;
            
            const respuesta = await this.certificador.FirmarXml(this.request);
            const nombreArchivo = `20553510661-07-F001-1`;
            const zip = await this.serializador.GenerarZip(respuesta.TramaXmlFirmado, nombreArchivo);
            fs.writeFileSync(`./${nombreArchivo}.zip`, zip, 'base64');
    
            //
            const wsdl = await fs.readFileSync(path.join(__dirname, 'services/soap/demo_ose_nubefact.wsdl'), 'utf8');
            //
            const client = await soap.createClientAsync('https://demo-ose.nubefact.com/ol-ti-itcpe/billService?wsdl');
            client.setSecurity(new soap.WSSecurity(`20553510661MODDATOS`,'MODDATOS', { 
                hasNonce: true, 
                actor: 'actor', 
            }));
            // client.sendBill({ fileName: `${nombreArchivo}.zip`, contentFile: zip }, (err, result, rawResponse, soapHeader, rawRequest) => {
            //     console.log(rawResponse);
            // });
            const respSunat = await client.sendBillAsync({
                fileName: `${nombreArchivo}.zip`, 
                contentFile: zip, 
            });
            console.log(respSunat);
            
            if (respuesta.Exito) {
                // console.log(respuesta.TramaXmlFirmado);
                const respW = await fs.writeFileSync('./TramaXmlFirmado.xml',respuesta.TramaXmlFirmado, 'utf8');
            } else {
                console.log(respuesta.MensajeError);
            }

            return this.appService.getHello();
        } catch (e) {
            // throw e;
            console.log(e);
            
        }
    }
}
