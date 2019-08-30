import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { PayableAmount } from './PayableAmount';
import { TaxSubtotal } from './TaxSubtotal';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class TaxTotal {
    @XMLChild({ namespace: CBC })
    public TaxableAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public TaxAmount?: PayableAmount;

    @XMLChild({ namespace: CAC })
    public TaxSubtotal?: TaxSubtotal;

    constructor(tt: TaxTotal) {
        this.TaxableAmount = tt.TaxableAmount;
        this.TaxAmount = tt.TaxAmount;
        this.TaxSubtotal = tt.TaxSubtotal;
    }
}
