import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessaoEntradaService } from './sessao-entrada.service';
import { CreateSessaoEntradaDto } from './dto/create-sessao-entrada.dto';
import { UpdateSessaoEntradaDto } from './dto/update-sessao-entrada.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Sessao')
@Controller('sessao-entrada')
export class SessaoEntradaController {
  constructor(private readonly sessaoEntradaService: SessaoEntradaService) {}

  @Post()
  create(@Body() createSessaoEntradaDto: CreateSessaoEntradaDto) {
    return this.sessaoEntradaService.create(createSessaoEntradaDto);
  }

  @Get()
  findAll() {
    return this.sessaoEntradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessaoEntradaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessaoEntradaDto: UpdateSessaoEntradaDto) {
    return this.sessaoEntradaService.update(id, updateSessaoEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessaoEntradaService.remove(id);
  }
}
