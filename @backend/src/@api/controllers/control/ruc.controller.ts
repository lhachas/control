import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Contribuyente } from 'control-consultas-doc';
import { SunatService } from '@control/api/services/ruc.service';
import { AccessGuard } from '@control/common/guards/access.guard';

@Controller('ruc')
export class SunatController {
    constructor(private readonly sunat: SunatService) {
    }

    @UseGuards(AccessGuard)
    @Get(':ruc')
    async consultDocument(@Param('ruc') ruc): Promise<Contribuyente> {
        return await this.sunat.consultRuc(ruc);
    }
}
