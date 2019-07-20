import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { PayableAmount } from './PayableAmount';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class AllowanceCharge {
    @XMLChild({ namespace: CBC })
    public ChargeIndicator?: boolean;

    @XMLChild({ namespace: CAC })
    public Amount?: PayableAmount;

    constructor(ac: AllowanceCharge) {
        this.ChargeIndicator = ac.ChargeIndicator;
        this.Amount = ac.Amount;
    }
}
