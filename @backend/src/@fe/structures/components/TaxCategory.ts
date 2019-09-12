import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { TaxScheme } from './TaxScheme';
import { TaxExemptionReasonCode } from './TaxExemptionReasonCode';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class TaxCategory {
    @XMLChild({ namespace: CBC })
    public Percent?: string;

    @XMLChild({ namespace: CBC })
    public TaxExemptionReasonCode?: TaxExemptionReasonCode;
    
    @XMLChild({ namespace: CBC })
    public TierRange?: string;
    
    @XMLChild({ namespace: CAC })
    public TaxScheme?: TaxScheme;

    @XMLChild({ namespace: CBC })
    public ID?: string;

    constructor(tc: TaxCategory) {
        this.Percent = tc.Percent;
        this.TaxExemptionReasonCode = tc.TaxExemptionReasonCode;
        this.TierRange = tc.TierRange;
        this.TaxScheme = tc.TaxScheme;
        this.ID = tc.ID;
    }
}
