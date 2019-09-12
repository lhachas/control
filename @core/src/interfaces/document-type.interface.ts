import { IBase } from '@core/interfaces/base.interface';

export interface IDocumentType extends IBase {
    readonly code: string;
    readonly description: string;
    readonly abbreviation: string;
}
