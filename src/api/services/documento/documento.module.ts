import { Module } from '@nestjs/common';
import { Documento } from './documento.service';

@Module({
    providers: [Documento],
    exports: [Documento],
})
export class DocumentoModule {}
