import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DocumentTypeService } from '@control/api/services/document-type.service';
import { DocumentTypeModel } from '@control/api/models/document-type.model';
import { ContactDto } from '@control/api/dto/contact.dto';

@Controller('document-type')
export class DocumenTypeController {
    constructor(private readonly documentTypeService: DocumentTypeService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<DocumentTypeModel[]> {
        return await this.documentTypeService.findAll();
    }
}
