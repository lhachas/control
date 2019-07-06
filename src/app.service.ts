import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { NotaCredito, FirmadoRequest } from '@cpe';
import { Documento } from './documento';
import { Certificador, Serializador } from '@cpe';

@Injectable()
export class AppService {
// tslint:disable-next-line: no-empty
  constructor(config: ConfigService) { }

  getHello(): string {
    return 'Hello World!';
  }
}
