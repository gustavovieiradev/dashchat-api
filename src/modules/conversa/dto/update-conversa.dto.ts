import { PartialType } from '@nestjs/swagger';
import { CreateConversaDto } from './create-conversa.dto';

export class UpdateConversaDto extends PartialType(CreateConversaDto) {}
