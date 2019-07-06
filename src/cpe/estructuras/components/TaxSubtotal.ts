import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { PayableAmount } from './PayableAmount';
import { TaxCategory } from './TaxCategory';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class TaxSubtotal {
    @XMLChild({ namespace: CBC })
    public TaxableAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public TaxAmount?: PayableAmount;

    @XMLChild({ namespace: CAC })
    public TaxCategory?: TaxCategory;

    @XMLChild({ namespace: CBC })
    public Percent?: number;

    constructor(ts: TaxSubtotal) {
        this.TaxableAmount = ts.TaxableAmount;
        this.TaxAmount = ts.TaxAmount;
        this.TaxCategory = ts.TaxCategory;
        this.Percent = ts.Percent;
    }
}
