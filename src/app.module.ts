import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { FacturaController } from './api/controllers/factura/factura.controller';
import { Documento } from './api/services/documento/documento.service';
import { DocumentoModule } from './api/services/documento/documento.module';

@Module({
  imports: [ConfigModule, DocumentoModule],
  controllers: [AppController, FacturaController],
  providers: [
    AppService, 
    ConfigService, 
    Documento,
  ],
})
export class AppModule {}
