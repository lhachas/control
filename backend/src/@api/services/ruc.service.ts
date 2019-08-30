import { Injectable } from '@nestjs/common';
import { Sunat, Contribuyente } from 'control-consultas-doc';

@Injectable()
export class SunatService {
    private sunat: Sunat;

    constructor() {
        this.sunat = new Sunat();
    }

    public async consultaRuc(ruc: string): Promise<Contribuyente> {
        return await this.sunat.consultaRuc(ruc);
    }
}
