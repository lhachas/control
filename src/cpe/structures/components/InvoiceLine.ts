import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@common';
import { InvoicedQuantity } from './InvoicedQuantity';
import { PayableAmount } from './PayableAmount';
import { PricingReference } from './PricingReference';
import { AllowanceCharge } from './AllowanceCharge';
import { TaxTotal } from './TaxTotal';
import { Item } from './Item';
import { Price } from './Price';

const { CAC, CBC } = prefix;

@XMLElement({ root: CAC })
export class InvoiceLine {
    @XMLChild({ namespace: CBC })
    public ID: string;

    @XMLChild({ namespace: CBC })
    public CreditedQuantity?: InvoicedQuantity;

    @XMLChild({ namespace: CBC })
    public InvoicedQuantity?: InvoicedQuantity;

    @XMLChild({ namespace: CBC })
    public DebitedQuantity?: InvoicedQuantity;

    @XMLChild({ namespace: CBC })
    public LineExtensionAmount?: PayableAmount;

    @XMLChild({ namespace: CAC })
    public PricingReference?: PricingReference;

    @XMLChild({ namespace: CAC })
    public AllowanceCharge?: AllowanceCharge;

    @XMLChild({ namespace: CAC, name: 'TaxTotal' })
    public TaxTotals?: TaxTotal[];

    @XMLChild({ namespace: CAC })
    public Item?: Item;

    @XMLChild({ namespace: CAC })
    public Price?: Price;

    constructor(il: InvoiceLine) {
        this.ID = il.ID;
        this.CreditedQuantity = il.CreditedQuantity;
        this.InvoicedQuantity = il.InvoicedQuantity;
        this.DebitedQuantity = il.DebitedQuantity;
        this.LineExtensionAmount = il.LineExtensionAmount;
        this.PricingReference = il.PricingReference;
        this.AllowanceCharge = il.AllowanceCharge;
        this.TaxTotals = il.TaxTotals;
        this.Item = il.Item;
        this.Price = il.Price;
        this.TaxTotals = new Array<TaxTotal>();
    }
}
