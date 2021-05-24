import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfiguraService } from './configura.service';
import { CreateConfiguraDto } from './dto/create-configura.dto';
import { UpdateConfiguraDto } from './dto/update-configura.dto';


@ApiTags('Configuracao projeto')
@Controller('configura')
export class ConfiguraController {
  constructor(private readonly configuraService: ConfiguraService) {}

  @Post()
  create(@Body() createConfiguraDto: CreateConfiguraDto) {
    return this.configuraService.create(createConfiguraDto);
  }

  @Get()
  findAll() {
    return this.configuraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuraService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfiguraDto: UpdateConfiguraDto) {
    return this.configuraService.update(id, updateConfiguraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuraService.remove(id);
  }
}
