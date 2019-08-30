import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Contribuyente } from 'control-consultas-doc';
import { SunatService } from '@control/api/services/ruc.service';

@Controller('ruc')
export class SunatController {
    constructor(private readonly sunat: SunatService) {
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get(':ruc')
    async ConsultaDoc(@Param('ruc') ruc): Promise<Contribuyente> {
        return await this.sunat.consultaRuc(ruc);
    }
}
