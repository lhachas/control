import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';
import { PayableAmount } from './PayableAmount';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class AlternativeConditionPrice {
    @XMLChild({ namespace: CBC })
    public PriceAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public PriceTypeCode?: string;

    constructor(acp: AlternativeConditionPrice) {
        this.PriceAmount = acp.PriceAmount;
        this.PriceTypeCode = acp.PriceTypeCode;
    }
}
