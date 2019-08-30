import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TipoDocumentoService } from '@control/api/services/tipo-documento.service';
import { TipoDocumentoEntity } from '@control/db/entities/tipo-documento.entity';
import { ContactoDto } from '@control/api/dto/contacto.dto';

@Controller('tipo-documento')
export class TipoDocumentoController {
    constructor(private readonly tipoDocumentoService: TipoDocumentoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async Listar(): Promise<TipoDocumentoEntity[]> {
        return await this.tipoDocumentoService.Listar();
    }
}
