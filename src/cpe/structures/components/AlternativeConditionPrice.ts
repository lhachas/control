import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { PayableAmount } from './PayableAmount';
import { PriceTypeCode } from './PriceTypeCode';
const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class AlternativeConditionPrice {
    @XMLChild({ namespace: CBC })
    public PriceAmount?: PayableAmount;

    @XMLChild({ namespace: CBC })
    public PriceTypeCode?: PriceTypeCode;

    constructor(acp: AlternativeConditionPrice) {
        this.PriceAmount = acp.PriceAmount;
        this.PriceTypeCode = acp.PriceTypeCode;
    }
}
