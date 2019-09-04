import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TipoDocumentoService } from '@control/api/services/tipo-documento.service';
import { TipoDocumentoModel } from '@control/api/models/tipo-documento.model';
import { ContactoDto } from '@control/api/dto/contacto.dto';

@Controller('tipo-documento')
export class TipoDocumentoController {
    constructor(private readonly tipoDocumentoService: TipoDocumentoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async Listar(): Promise<TipoDocumentoModel[]> {
        return await this.tipoDocumentoService.Listar();
    }
}
