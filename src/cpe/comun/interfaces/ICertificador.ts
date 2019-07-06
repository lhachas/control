import { FirmadoRequest, FirmadoResponse } from '@comun';
export interface ICertificador {
    FirmarXml(request: FirmadoRequest): Promise<FirmadoResponse>;
}
