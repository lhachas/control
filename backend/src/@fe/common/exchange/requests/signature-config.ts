export class SignatureConfig {
    protected _certificate?: string;
    protected _certificatePassword?: string;
    protected _xmlDocument?: string;
    protected _unSoloNodoExtension?: boolean;
    protected _openSSL?: string;

    get certificate(): string {
        return this._certificate;
    }

    set certificate(_certificate: string) {
        this._certificate = _certificate;
    }

    get certificatePassword(): string {
        return this._certificatePassword;
    }

    set certificatePassword(_certificatePassword: string) {
        this._certificatePassword = _certificatePassword;
    }

    get xmlDocument(): string {
        return this._xmlDocument;
    }

    set xmlDocument(_xmlDocument: string) {
        this._xmlDocument = _xmlDocument;
    }

    get openSSL(): string {
        return this._openSSL;
    }

    set openSSL(_openSSL: string) {
        this._openSSL = _openSSL;
    }
}
