import { PartialType } from '@nestjs/swagger';
import { CreateConfiguraDto } from './create-configura.dto';

export class UpdateConfiguraDto extends PartialType(CreateConfiguraDto) {}
