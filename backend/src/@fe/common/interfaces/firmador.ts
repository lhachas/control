import { ConfigFirma, RFirma } from '@fe/common';

export interface IFirmador {
    Config: ConfigFirma;
    xml(): Promise<RFirma>;
}
