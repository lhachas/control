import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { AlternativeConditionPrice } from './AlternativeConditionPrice';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class PricingReference {
    @XMLChild({ namespace: CAC, name: 'AlternativeConditionPrice' })
    public AlternativeConditionPrices: AlternativeConditionPrice[];

    constructor(pr: PricingReference) {
        this.AlternativeConditionPrices = pr.AlternativeConditionPrices;
    }
}
