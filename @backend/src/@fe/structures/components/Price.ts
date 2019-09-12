import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';
import { PayableAmount } from './PayableAmount';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class Price {
    @XMLChild({ namespace: CBC })
    public PriceAmount: PayableAmount;

    constructor(price: Price) {
        this.PriceAmount = price.PriceAmount;
    }
}
