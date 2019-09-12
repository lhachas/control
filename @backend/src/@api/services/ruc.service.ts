import { Injectable, HttpStatus, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Sunat, Contribuyente } from 'control-consultas-doc';
import { string } from 'joi';

@Injectable()
export class SunatService {
    private sunat: Sunat;

    constructor() {
        this.sunat = new Sunat();
    }

    public async consultRuc(ruc: string): Promise<Contribuyente> {
        try {
            return await this.sunat.consultaRuc(ruc);
        } catch (error) {
            if (typeof error === 'string' || error instanceof string) {
                throw new BadRequestException(error, 'Consulta invalida');
            } else {
                throw new ForbiddenException(error);
            }
        }
    }
}
