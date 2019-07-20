import { PayableAmount } from './PayableAmount';

export class AdditionalMonetaryTotal {
    private id?: string;
    private payableAmount?: PayableAmount;
    private referenceAmount?: PayableAmount;
    private totalAmount?: PayableAmount;
    private percent?: number;

    get Id(): string {
        return this.id;
    }
    set Id(Id: string) {
        this.id = Id;
    }

    get PayableAmount(): PayableAmount {
        return this.payableAmount;
    }
    set PayableAmount(PA: PayableAmount) {
        this.payableAmount = PA;
    }

    get ReferenceAmount(): PayableAmount {
        return this.referenceAmount;
    }
    set ReferenceAmount(RA: PayableAmount) {
        this.referenceAmount = RA;
    }
    get TotalAmount(): PayableAmount {
        return this.totalAmount;
    }
    set TotalAmount(TA: PayableAmount) {
        this.totalAmount = TA;
    }

    get Percent(): number {
        return this.percent;
    }
    set Percent(Percent: number) {
        this.percent = Percent;
    }
}
