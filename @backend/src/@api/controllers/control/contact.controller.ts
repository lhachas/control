import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from '@control/api/services/contact.service';
import { ContactModel } from '@control/api/models/contact.model';
import { ContactDto } from '@control/api/dto/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // async Nuevo(@Body() contacto: ContactoDto): Promise<ContactoModel> {
    //     return this.contactoService.nuevo(contacto);
    // }

    // @Get()
    // @HttpCode(HttpStatus.OK)
    // async Listar(): Promise<ContactoModel[]> {
    //     return await this.contactoService.listar();
    // }

    // @Get('buscar/:id')
    // @HttpCode(HttpStatus.OK)
    // async Recuperar(@Param('id') id: number): Promise<ContactoModel> {
    //     return await this.contactoService.getContacto(id);
    // }

    // @Put('actualizar/:id')
    // @HttpCode(HttpStatus.OK)
    // async Actualizar(@Param('id') id: number, @Body() contacto: ContactoDto): Promise<any> {
    //     return this.contactoService.actualizar(contacto);
    // }

    // @Delete('eliminar/:id')
    // @HttpCode(HttpStatus.OK)
    // async Eliminar(@Param('id') id: number): Promise<any> {
    //     return this.contactoService.eliminar(id);
    // }
}
