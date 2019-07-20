import { Client, SoapMethod, IService, ISoapServiceMethod } from 'soap';
import { Document } from '../parameters';

export interface BillService extends Client {
    /**
     * 
     * El método sendBill recibe como parámetro un nombre de archivo especificado por la SUNAT
     *  y el contenido de un archivo ZIP con un único documento XML de comprobante y devuelve
     *  un archivo Zip que contiene un documento XML que es la constancia de aceptación ó rechazo.
     * 
     */
    sendBillAsync(bill: Document): Promise<ISoapServiceMethod>;
}
