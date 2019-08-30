import { Controller, Get } from '@nestjs/common';
import { UbigeoService } from '@control/api/services/ubigeo.service';
import { UbigeoEntity } from '@control/db/entities/ubigeo.entity';

@Controller('ubigeo')
export class UbigeoController {
  constructor(private readonly ubigeoService: UbigeoService) {}

  @Get()
  findAll(): Promise<UbigeoEntity> {
    return this.ubigeoService.create();
  }
}
