import { XMLElement, XMLAttribute, XMLText } from 'xml-serializer-ts';
import { prefix } from '@common';

const { CBC } = prefix;

@XMLElement({ root: CBC})
export class Note {
    @XMLAttribute({ name: '' })
    public languageLocaleID?: string;

    @XMLText({ name: '' })
    public Value: string;

    constructor(ni: Note) {
        this.languageLocaleID = ni.languageLocaleID;
        this.Value = ni.Value;
    }
}
