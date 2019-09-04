import { Controller, Get } from '@nestjs/common';
import { UbigeoService } from '@control/api/services/ubigeo.service';
import { UbigeoModel } from '@control/api/models/ubigeo.model';

@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @Get()
  findAll(): Promise<UbigeoModel> {
    return this.ubigeoService.create();
  }
}
