import { AdditionalMonetaryTotal } from './AdditionalMonetaryTotal';
import { AdditionalProperty } from './AdditionalProperty';
import { SunatEmbededDespatchAdvice } from './SunatEmbededDespatchAdvice';
import { SunatCosts } from './SunatCosts';
import { SunatTransaction } from './SunatTransaction';

export class AdditionalInformation {
    private additionalMonetaryTotals?: AdditionalMonetaryTotal[];
    private additionalProperties?: AdditionalProperty[];
    private sunatEmbededDespatchAdvice?: SunatEmbededDespatchAdvice;
    private sunatCosts?: SunatCosts;
    private sunatTransaction?: SunatTransaction;

    get AdditionalMonetaryTotals(): AdditionalMonetaryTotal[] {
        return this.additionalMonetaryTotals;
    }
    set AdditionalMonetaryTotals(additionalMonetaryTotals: AdditionalMonetaryTotal[]) {
        this.additionalMonetaryTotals = additionalMonetaryTotals;
    }

    get AdditionalProperties(): AdditionalProperty[] {
        return this.additionalProperties;
    }
    set AdditionalProperties(additionalProperties: AdditionalProperty[]) {
        this.additionalProperties = additionalProperties;
    }

    get SunatEmbededDespatchAdvice(): SunatEmbededDespatchAdvice {
        return this.sunatEmbededDespatchAdvice;
    }
    set SunatEmbededDespatchAdvice(sunatEmbededDespatchAdvice: SunatEmbededDespatchAdvice) {
        this.sunatEmbededDespatchAdvice = sunatEmbededDespatchAdvice;
    }

    get SunatCosts(): SunatCosts {
        return this.sunatCosts;
    }
    set SunatCosts(sunatCosts: SunatCosts) {
        this.sunatCosts = sunatCosts;
    }

    get SunatTransaction(): SunatTransaction {
        return this.sunatTransaction;
    }
    set SunatTransaction(sunatTransaction: SunatTransaction) {
        this.sunatTransaction = sunatTransaction;
    }

    constructor() {
        this.AdditionalMonetaryTotals = new Array<AdditionalMonetaryTotal>();
        this.AdditionalProperties = new Array<AdditionalProperty>();
        this.SunatEmbededDespatchAdvice = new SunatEmbededDespatchAdvice();
        this.SunatTransaction = new SunatTransaction();
        this.SunatCosts = new SunatCosts();
    }
}
