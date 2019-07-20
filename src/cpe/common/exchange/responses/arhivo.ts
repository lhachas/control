import { Comun } from './comun';

export class Archivo extends Comun {
    private nombreArchivo: string;

    get NombreArchivo(): string {
        return this.nombreArchivo;
    }
    set NombreArchivo(nombreArchivo: string) {
        this.nombreArchivo = nombreArchivo;
    }
} 
