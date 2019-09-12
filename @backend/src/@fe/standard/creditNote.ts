import { XMLElement, XMLChild, XMLAttribute } from 'xml-serializer-ts';
import { EspacioNombres, prefix } from '@fe/common/constants';
import { 
    UblExtensions, 
    DiscrepancyResponse, 
    BillingReference, 
    InvoiceDocumentReference,
    SignatureCac,
    AccountingSupplierParty,
    TaxTotal,
    LegalMonetaryTotal,
    InvoiceLine,
} from '@fe/structures';

const { CREDIT_NOTE, EXT, CAC, CBC } = prefix;

@XMLElement({ root: CREDIT_NOTE })
export class CreditNote {
    @XMLAttribute({ name: '' })
    protected readonly xmlns: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly cac: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly cbc: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly ccts: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly ds: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly ext: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly qdt: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly  sac: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly  udt: string;
    @XMLAttribute({ namespace: 'xmlns' })
    protected readonly xsi: string;

    @XMLChild({ namespace: EXT })
    public UBLExtensions: UblExtensions;

    @XMLChild({ namespace: CBC })
    public UBLVersionID: string;

    @XMLChild({ namespace: CBC })
    public CustomizationID: string;

    @XMLChild({ namespace: CBC })
    public ID: string;

    @XMLChild({ namespace: CBC })
    public IssueDate: string;

    @XMLChild({ namespace: CBC })
    public DocumentCurrencyCode: string;

    @XMLChild({ namespace: CAC, name: 'DiscrepancyResponse' })
    public DiscrepancyResponses: DiscrepancyResponse[];

    @XMLChild({ namespace: CAC, name: 'BillingReference' })
    public BillingReferences: BillingReference[];

    @XMLChild({ namespace: CAC, name: 'DespatchDocumentReference' })
    public DespatchDocumentReferences: InvoiceDocumentReference[];

    @XMLChild({ namespace: CAC, name: 'AdditionalDocumentReference' })
    public AdditionalDocumentReferences: InvoiceDocumentReference[];

    @XMLChild({ namespace: CAC })
    public Signature: SignatureCac;

    @XMLChild({ namespace: CAC })
    public AccountingSupplierParty: AccountingSupplierParty;
   
    @XMLChild({ namespace: CAC })
    public AccountingCustomerParty: AccountingSupplierParty;

    @XMLChild({ namespace: CAC, name: 'TaxTotal' })
    public TaxTotals: TaxTotal[];

    @XMLChild({ namespace: CAC })
    public LegalMonetaryTotal: LegalMonetaryTotal;

    @XMLChild({ namespace: CAC, name: 'CreditNoteLine' })
    public CreditNoteLines: InvoiceLine[];

    constructor() {
        this.xmlns = EspacioNombres.xmlnsCreditNote;
        this.cac = EspacioNombres.cac;
        this.cbc = EspacioNombres.cbc;
        this.ccts = EspacioNombres.ccts;
        this.ds = EspacioNombres.ds;
        this.ext = EspacioNombres.ext;
        this.qdt = EspacioNombres.qdt;
        this.sac = EspacioNombres.sac;
        this.udt = EspacioNombres.udt;
        this.xsi = EspacioNombres.xsi;
        this.DiscrepancyResponses = new Array<DiscrepancyResponse>();
        this.BillingReferences = new Array<BillingReference>();
        this.DespatchDocumentReferences = new Array<InvoiceDocumentReference>();
        this.AdditionalDocumentReferences = new Array<InvoiceDocumentReference>();
        this.TaxTotals = new Array<TaxTotal>();
        this.CreditNoteLines = new Array<InvoiceLine>();
    }
}
