import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
// tslint:disable-next-line: no-empty
  constructor(config: ConfigService) { }

  getHello(): string {
    return 'Hello World!';
  }
}
