import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanetService } from './planet.service';

@Controller('planets')
@ApiTags('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  getPlanetsByCondition() {
    return this.planetService.findAllByCondition();
  }

  @Get(':name')
  getPlanet(@Param('name') name: string) {
    return this.planetService.findByName(name);
  }
}
