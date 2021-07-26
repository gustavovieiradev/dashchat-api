import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConversaService } from './conversa.service';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { TalkConversaDto } from './dto/talk-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';

@ApiTags('Conversa')
@Controller('conversa')
export class ConversaController {
  constructor(private readonly conversaService: ConversaService) {}

  @Post()
  create(@Body() createConversaDto: CreateConversaDto) {
    return this.conversaService.create(createConversaDto);
  }

  @Get()
  findAll() {
    return this.conversaService.findAll();
  }

  @Post('talk')
  conversa(@Body() talk: TalkConversaDto) {
    return this.conversaService.conversa(talk);
  }

  @Post('webhook')
  webhook(@Param('projeto') projeto: string, @Body() talk: any) {
    return this.conversaService.webhook(projeto, talk);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversaDto: UpdateConversaDto,
  ) {
    return this.conversaService.update(id, updateConversaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversaService.remove(id);
  }
}
