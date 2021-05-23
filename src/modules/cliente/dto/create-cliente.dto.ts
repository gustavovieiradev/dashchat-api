import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString()
  public nome: string;
}
