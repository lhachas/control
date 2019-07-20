export class Document { 
    /**
     * @description
     * Se debe consignar el nombre del archivo de acuerdo a la especificación de la SUNAT.
     * @example 
     * [20100066603-01-F001-1.ZIP]
     * 
     */
    public fileName: string;

    /**
     * @description
     * Se debe consignar el contenido del archivo ZIP en un arreglo de bytes.
     * 
     */
    public contentFile: string;

    /**
     * @description
     * ¡?
     */
    public partyType?: string;
}
