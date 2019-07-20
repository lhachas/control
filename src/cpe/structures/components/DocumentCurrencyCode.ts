import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC})
export class DocumentCurrencyCode {
    @XMLAttribute({ name: '' })
    public listID?: string;

    @XMLAttribute({ name: '' })
    public listName?: string;

    @XMLAttribute({ name: '' })
    public listAgencyName?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(dcc: DocumentCurrencyCode) {
        this.listID = dcc.listID;
        this.listName = dcc.listName;
        this.listAgencyName = dcc.listName;
        this.Value = dcc.Value;
    }
}
