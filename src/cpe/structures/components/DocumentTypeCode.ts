import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC })
export class DocumentTypeCode {
    @XMLAttribute({ name: '' })
    public listName?: string;

    @XMLAttribute({ name: '' })
    public listAgencyName?: string;

    @XMLAttribute({ name: '' })
    public listURI?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(dtc: DocumentTypeCode) {
        this.listName = dtc.listName;
        this.listAgencyName = dtc.listAgencyName;
        this.listURI = dtc.listURI;
        this.Value = dtc.Value;
    }
}
