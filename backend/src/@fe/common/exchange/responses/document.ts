import { Comun } from './comun';

export class RDocument extends Comun {
    private _xmlDocument: string;

    get xmlDocument(): string {
        return this._xmlDocument;
    }
    set xmlDocument(_xmlDocument: string) {
        this._xmlDocument = _xmlDocument;
    }
}
