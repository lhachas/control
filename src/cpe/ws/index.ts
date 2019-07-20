import { Client, createClientAsync , WSSecurity } from 'soap';
import { ConexionWS, RespuestaWS, PDocumento, ErrorWS, PEstadoCDR } from '@common';
import { Utils } from '@utils';

export class WS {
    protected client: Client;
    private utils: Utils;

    constructor() {
        this.utils = new Utils();
    }
        
    /**
     * @param conexionWS ConexionSoap
     * @return void
     * 
     */
    public async Autenticacion(conexionWS: ConexionWS): Promise<void> {
        try {
            this.client = await createClientAsync(conexionWS.WS, {
                returnFault: true,
            });
            this.client.setSecurity(new WSSecurity(conexionWS.RUC.concat(conexionWS.UsuarioSOL), conexionWS.ClaveSOL));
            if (conexionWS.EndPoint !== '') {
                this.client.setEndpoint(conexionWS.EndPoint);
            }
        } catch (e) {
            throw e;
        }
    }

    public async EnviarDocumento(documento: PDocumento): Promise<RespuestaWS> {
        const docRespuesta = new RespuestaWS();
        try {
            const [ { applicationResponse } ] = await this.client.sendBillAsync({
                fileName: documento.NombreArchivo.concat('.zip'), 
                contentFile: documento.Zip, 
            });
            docRespuesta.ConstanciaDeRecepcion = applicationResponse;
            docRespuesta.Exito = true;
        } catch (e) {
            docRespuesta.Exito = false;
            docRespuesta.ErrorWS = new ErrorWS(e);
            docRespuesta.Origen = 'EnviarComprobante';
        }
        return docRespuesta;
    }

    public async EnviarResumen(documento: PDocumento): Promise<RespuestaWS> {
        const docRespuesta = new RespuestaWS();
        try {
            const [ { ticket } ] = await this.client.sendSummaryAync({
                fileName: documento.NombreArchivo.concat('.zip'),
                contentFile: documento.Zip,
            });
            docRespuesta.Ticket = ticket;
            docRespuesta.Exito = true;
        } catch (e) {
            docRespuesta.Exito = false;
            docRespuesta.ErrorWS = new ErrorWS(e);
            docRespuesta.Origen = 'EnviarResumen';
        }
        return docRespuesta;
    }

    public async EstadoDocumento(ticket: string): Promise<RespuestaWS> {
        const docRespuesta = new RespuestaWS();
        try {
            const [ { status: { statusCode, content } } ] = await this.client.getSatusAsync({ ticket });
            if(this.utils.Procesado(statusCode)) {
                docRespuesta.ConstanciaDeRecepcion = content;
                docRespuesta.Exito = true;
            } else {
                docRespuesta.Exito = false;
                docRespuesta.MensajeError = 'En proceso';
            }
        } catch (e) {
            docRespuesta.Exito = false;
            docRespuesta.ErrorWS = new ErrorWS(e);
            docRespuesta.Origen = 'EstadoDocumento';
        }
        return docRespuesta;
    }

    public async ConsultarCDR(estadoCDR: PEstadoCDR): Promise<RespuestaWS> {
        const docRespuesta = new RespuestaWS();
        try {
            const [ { status: { statusCode, content } } ] = await this.client.getStatusCdrAsync({
                rucComprobante: estadoCDR.RucComprobante,
                tipoComprobante: estadoCDR.TipoComprobante,
                serieComprobante: estadoCDR.SerieComprobante,
                numeroComprobante: estadoCDR.NumeroComprobante,
            });
            if(this.utils.Procesado(statusCode)) {
                docRespuesta.ConstanciaDeRecepcion = content;
                docRespuesta.Exito = true;
            } else {
                docRespuesta.Exito = false;
                docRespuesta.MensajeError = 'En proceso';
            }
        } catch (e) {
            docRespuesta.Exito = false;
            docRespuesta.ErrorWS = new ErrorWS(e);
            docRespuesta.Origen = 'ConsultarCDR';
        }
        return docRespuesta;
    }
}
