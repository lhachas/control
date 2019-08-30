import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactoService } from '@control/api/services/contacto.service';
import { ContactoEntity } from '@control/db/entities/contacto.entity';
import { ContactoDto } from '@control/api/dto/contacto.dto';

@Controller('contacto')
export class ContactoController {
    constructor(private readonly contactoService: ContactoService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async Nuevo(@Body() contacto: ContactoDto): Promise<ContactoEntity> {
        return this.contactoService.Nuevo(contacto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async Listar(): Promise<ContactoEntity[]> {
        return await this.contactoService.Listar();
    }

    @Get('buscar/:id')
    @HttpCode(HttpStatus.OK)
    async Recuperar(@Param('id') id: number): Promise<ContactoEntity> {
        return await this.contactoService.Buscar(id);
    }

    @Put('actualizar/:id')
    @HttpCode(HttpStatus.OK)
    async Actualizar(@Param('id') id: number, @Body() contacto: ContactoDto): Promise<any> {
        return this.contactoService.Actualizar(contacto);
    }

    @Delete('eliminar/:id')
    @HttpCode(HttpStatus.OK)
    async Eliminar(@Param('id') id: number): Promise<any> {
        return this.contactoService.Eliminar(id);
    }
}
