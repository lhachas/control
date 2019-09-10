import { SignatureConfig, RSign } from '@fe/common';

export interface ISigner {
    config: SignatureConfig;
    xml(): Promise<RSign>;
}
