import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC})
export class InvoiceTypeCode {
    @XMLAttribute({ name: '' })
    public listID?: string;

    @XMLAttribute({ name: '' })
    public listAgencyName?: string;

    @XMLAttribute({ name: '' })
    public listName?: string;

    @XMLAttribute({ name: '' })
    public listURI?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(itc: InvoiceTypeCode) {
        this.listID = itc.listID;
        this.listAgencyName = itc.listAgencyName;
        this.listName = itc.listName;
        this.Value = itc.Value;
    }
}
