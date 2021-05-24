import { PartialType } from '@nestjs/swagger';
import { CreateSessaoEntradaDto } from './create-sessao-entrada.dto';

export class UpdateSessaoEntradaDto extends PartialType(CreateSessaoEntradaDto) {}
