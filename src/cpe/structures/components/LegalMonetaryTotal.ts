import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { PayableAmount } from './PayableAmount';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class LegalMonetaryTotal {
    @XMLChild({ namespace: CBC })
    public LineExtensionAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public TaxInclusiveAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public PayableAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public AllowanceTotalAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public ChargeTotalAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public PrepaidAmount?: PayableAmount;

    constructor(lmt: LegalMonetaryTotal) {
        this.LineExtensionAmount = lmt.LineExtensionAmount;
        this.TaxInclusiveAmount = lmt.TaxInclusiveAmount;
        this.PayableAmount = lmt.PayableAmount;
        this.AllowanceTotalAmount = lmt.AllowanceTotalAmount;
        this.ChargeTotalAmount = lmt.ChargeTotalAmount;
        this.PrepaidAmount = lmt.PrepaidAmount;
    }
}
