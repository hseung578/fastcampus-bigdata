import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZipService } from './zip.service';

@Controller('Zips')
@ApiTags('Zips')
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Get()
  getZips() {
    return this.zipService.findAll();
  }
}
