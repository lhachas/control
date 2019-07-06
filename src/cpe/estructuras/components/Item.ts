import { XMLElement, XMLChild } from 'xml-serializer-ts';
import { prefix } from '@prefix';

const { CAC, CBC } = prefix;

// tslint:disable-next-line: max-classes-per-file
@XMLElement({ root: CAC })
export class SellersItemIdentification {
    @XMLChild({ namespace: CBC })
    public ID: string;
    
    constructor(sii: SellersItemIdentification) {
        this.ID = sii.ID;
    }
}

// tslint:disable-next-line: max-classes-per-file
@XMLElement({ root: CAC })
export class AdditionalItemIdentification {
    @XMLChild({ namespace: CBC })
    public ID: string;
    
    constructor(aii: AdditionalItemIdentification) {
        this.ID = aii.ID;
    }
}

// tslint:disable-next-line: max-classes-per-file
@XMLElement({ root: CAC })
export class Item {
    @XMLChild({ namespace: CBC })
    public Description?: string;

    @XMLChild({ namespace: CAC })
    public SellersItemIdentification?: SellersItemIdentification;

    @XMLChild({ namespace: CAC })
    public  AdditionalItemIdentification?: AdditionalItemIdentification;
    
    constructor(item: Item) {
        this.Description = item.Description;
        this.SellersItemIdentification = item.SellersItemIdentification;
        this.AdditionalItemIdentification = item.AdditionalItemIdentification;
    }
}
