import { Comun } from './comun';

export class File extends Comun {
    private _fileName: string;

    get fileName(): string {
        return this._fileName;
    }
    set fileName(_fileName: string) {
        this._fileName = _fileName;
    }
}
