import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TalkConversaDto {
  @ApiProperty()
  @IsString()
  public ref: string;

  @ApiProperty()
  @IsString()
  public input: string;

  @ApiProperty()
  @IsString()
  public nextIntent: string;

}
