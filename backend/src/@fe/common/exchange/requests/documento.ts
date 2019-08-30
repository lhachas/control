export class PDocumento {
    private nombreArchivo: string;
    private zip: string;

    /**
     * nombre de archivo especificado por la SUNAT
     */
    get NombreArchivo(): string {
        return this.nombreArchivo;
    }

    set NombreArchivo(nombreArchivo: string) {
        this.nombreArchivo = nombreArchivo;
    }

    /**
     * contenido de un archivo ZIP con un único documento XML de comprobante
     */
    get Zip(): string {
        return this.zip;
    }

    set Zip(zip: string) {
        this.zip = zip.concat('.zip');
    }
}
