import { PostalAddress } from './PostalAddress';
import { AccountingSupplierParty } from './AccountingSupplierParty';
import { AgentParty } from './AgentParty';
import { SunatRoadTransport } from './SunatRoadTransport';
import { InvoicedQuantity } from './InvoicedQuantity';

export class SunatEmbededDespatchAdvice {
    private DeliveryAddress: PostalAddress;
    private OriginAddress: PostalAddress;
    private SunatCarrierParty: AccountingSupplierParty;
    private DriverParty: AgentParty;
    private SunatRoadTransport: SunatRoadTransport;
    private TransportModeCode: string;
    private GrossWeightMeasure: InvoicedQuantity;

    constructor() {
        // this.DeliveryAddress = new PostalAddress();
        // this.OriginAddress = new PostalAddress();
        this.DriverParty = new AgentParty();
        this.SunatRoadTransport = new SunatRoadTransport();
        // this.GrossWeightMeasure = new InvoicedQuantity();
    }
}
