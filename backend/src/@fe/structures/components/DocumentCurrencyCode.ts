import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@fe/common/constants';

const { CBC } = prefix;

@XMLElement({ root: CBC})
export class DocumentCurrencyCode {
    @XMLAttribute({ name: '' })
    public listID?: string;

    @XMLAttribute({ name: '' })
    public listName?: string;

    @XMLAttribute({ name: '' })
    public listAgencyName?: string;

    @XMLAttribute({ name: '' })
    public listURI?: string;

    @XMLAttribute({ name: '' })
    public name?: string;

    @XMLAttribute({ name: '' })
    public listSchemeURI?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(dcc: DocumentCurrencyCode) {
        this.listID = dcc.listID;
        this.listName = dcc.listName;
        this.listAgencyName = dcc.listAgencyName;
        this.listURI = dcc.listURI;
        this.name = dcc.name;
        this.listSchemeURI = dcc.listSchemeURI;
        this.Value = dcc.Value;
    }
}
