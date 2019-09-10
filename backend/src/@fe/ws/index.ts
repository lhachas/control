import { Client, createClientAsync , WSSecurity } from 'soap';
import { ConnectionWS, ResponseWS, PDocument, ErrorWS, PStatusCDR } from '@fe/common/exchange';
import { Utils } from '@fe/utils';

export class WS {
    protected client: Client;
    private utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    /**
     * @description
     * @auth
     * @param connectionWS ConexionSoap
     * @return void
     *
     */
    public async auth(connectionWS: ConnectionWS): Promise<void> {
        try {
            this.client = await createClientAsync(connectionWS.ws, {
                returnFault: true,
            });
            this.client.setSecurity(new WSSecurity(connectionWS.ruc.concat(connectionWS.userSOL), connectionWS.passwordSOL));
            if (connectionWS.endPoint !== '') {
                this.client.setEndpoint(connectionWS.endPoint);
            }
        } catch (e) {
            throw e;
        }
    }

    public async sendBill(document: PDocument): Promise<ResponseWS> {
        const responseWS = new ResponseWS();
        try {
            const [ { applicationResponse } ] = await this.client.sendBillAsync({
                fileName: document.fileName.concat('.zip'),
                contentFile: document.zip,
            });
            responseWS.constancyOfRecepty = applicationResponse;
            responseWS.success = true;
        } catch (e) {
            responseWS.success = false;
            responseWS.errorWS = new ErrorWS(e);
            responseWS.origin = 'EnviarComprobante';
        }
        return responseWS;
    }

    public async sendSumary(document: PDocument): Promise<ResponseWS> {
        const responseWS = new ResponseWS();
        try {
            const [ { ticket } ] = await this.client.sendSummaryAync({
                fileName: document.fileName.concat('.zip'),
                contentFile: document.zip,
            });
            responseWS.ticket = ticket;
            responseWS.success = true;
        } catch (e) {
            responseWS.success = false;
            responseWS.errorWS = new ErrorWS(e);
            responseWS.origin = 'EnviarResumen';
        }
        return responseWS;
    }

    public async getStatus(ticket: string): Promise<ResponseWS> {
        const responseWS = new ResponseWS();
        try {
            const [ { status: { statusCode, content } } ] = await this.client.getSatusAsync({ ticket });
            if(this.utils.processed(statusCode)) {
                responseWS.constancyOfRecepty = content;
                responseWS.success = true;
            } else {
                responseWS.success = false;
                responseWS.message = 'En proceso';
            }
        } catch (e) {
            responseWS.success = false;
            responseWS.errorWS = new ErrorWS(e);
            responseWS.origin = 'EstadoDocumento';
        }
        return responseWS;
    }

    public async getStatusCDR(statusCDR: PStatusCDR): Promise<ResponseWS> {
        const responseWS = new ResponseWS();
        try {
            const [ { status: { statusCode, content } } ] = await this.client.getStatusCdrAsync({
                rucComprobante: statusCDR.voucherRUC,
                tipoComprobante: statusCDR.voucherType,
                serieComprobante: statusCDR.voucherSerie,
                numeroComprobante: statusCDR.voucherNumber,
            });
            if(this.utils.processed(statusCode)) {
                responseWS.constancyOfRecepty = content;
                responseWS.success = true;
            } else {
                responseWS.success = false;
                responseWS.message = 'En proceso';
            }
        } catch (e) {
            responseWS.success = false;
            responseWS.errorWS = new ErrorWS(e);
            responseWS.origin = 'ConsultarCDR';
        }
        return responseWS;
    }
}
