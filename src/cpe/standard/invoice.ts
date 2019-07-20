import { XMLElement, XMLChild, XMLAttribute } from 'xml-serializer-ts';
import { EspacioNombres, prefix } from '@common';
import { 
    UblExtensions, 
    InvoiceDocumentReference,
    SignatureCac,
    AccountingSupplierParty,
    TaxTotal,
    LegalMonetaryTotal,
    InvoiceLine,
    InvoiceTypeCode,
    Note,
    DocumentCurrencyCode,
    PrepaidPayment,
} from '@structures';

const { INVOICE, EXT, CAC, CBC} = prefix;

@XMLElement({ root: INVOICE})
export class Invoice {
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
    public DueDate: string;

    @XMLChild({ namespace: CBC })
    public InvoiceTypeCode: InvoiceTypeCode;

    @XMLChild({ namespace: CBC })
    public Note: Note;

    @XMLChild({ namespace: CBC })
    public DocumentCurrencyCode: DocumentCurrencyCode;

    @XMLChild({ namespace: CBC })
    public LineCountNumeric: string;

    @XMLChild({ namespace: CAC, name: 'AdditionalDocumentReference' })
    public AdditionalDocumentReferences: InvoiceDocumentReference[];

    @XMLChild({ namespace: CAC })
    public Signature: SignatureCac;
    
    @XMLChild({ namespace: CAC })
    public AccountingSupplierParty: AccountingSupplierParty;

    @XMLChild({ namespace: CAC })
    public AccountingCustomerParty: AccountingSupplierParty;
   
    @XMLChild({ namespace: CAC })
    public PrepaidPayment: PrepaidPayment;

    @XMLChild({ namespace: CAC, name: 'TaxTotal' })
    public TaxTotals: TaxTotal[];

    @XMLChild({ namespace: CAC })
    public LegalMonetaryTotal: LegalMonetaryTotal;
    
    @XMLChild({ namespace: CAC, name: 'InvoiceLine' })
    public InvoiceLine: InvoiceLine[];

    constructor() {
        this.xmlns = EspacioNombres.xmlnsInvoice;
        this.cac = EspacioNombres.cac;
        this.cbc = EspacioNombres.cbc;
        this.ccts = EspacioNombres.ccts;
        this.ds = EspacioNombres.ds;
        this.ext = EspacioNombres.ext;
        this.qdt = EspacioNombres.qdt;
        this.sac = EspacioNombres.sac;
        this.udt = EspacioNombres.udt;
        this.xsi = EspacioNombres.xsi;
        this.AdditionalDocumentReferences = new Array<InvoiceDocumentReference>();
        this.TaxTotals = new Array<TaxTotal>();
        this.InvoiceLine = new Array<InvoiceLine>();
    }
}
