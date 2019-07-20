import { PFirmado, Firmado } from 'src/cpe/common';

export interface ICertificador {
    FirmarXml(request: PFirmado): Promise<Firmado>;
}
