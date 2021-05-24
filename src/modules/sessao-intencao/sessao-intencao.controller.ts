import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessaoIntencaoService } from './sessao-intencao.service';
import { CreateSessaoIntencaoDto } from './dto/create-sessao-intencao.dto';
import { UpdateSessaoIntencaoDto } from './dto/update-sessao-intencao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sessao')
@Controller('sessao-intencao')
export class SessaoIntencaoController {
  constructor(private readonly sessaoIntencaoService: SessaoIntencaoService) {}

  @Post()
  create(@Body() createSessaoIntencaoDto: CreateSessaoIntencaoDto) {
    return this.sessaoIntencaoService.create(createSessaoIntencaoDto);
  }

  @Get()
  findAll() {
    return this.sessaoIntencaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessaoIntencaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessaoIntencaoDto: UpdateSessaoIntencaoDto) {
    return this.sessaoIntencaoService.update(id, updateSessaoIntencaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessaoIntencaoService.remove(id);
  }
}
