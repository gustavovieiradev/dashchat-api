import { PartialType } from '@nestjs/swagger';
import { CreateSessaoIntencaoDto } from './create-sessao-intencao.dto';

export class UpdateSessaoIntencaoDto extends PartialType(CreateSessaoIntencaoDto) {}
