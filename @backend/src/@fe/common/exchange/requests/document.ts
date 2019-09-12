export class PDocument {
    private _fileName: string;
    private _zip: string;

    /**
     * nombre de archivo especificado por la SUNAT
     */
    get fileName(): string {
        return this._fileName;
    }

    set fileName(_fileName: string) {
        this._fileName = _fileName;
    }

    /**
     * contenido de un archivo ZIP con un único documento XML de comprobante
     */
    get zip(): string {
        return this._zip;
    }

    set zip(_zip: string) {
        this._zip = _zip.concat('.zip');
    }
}
