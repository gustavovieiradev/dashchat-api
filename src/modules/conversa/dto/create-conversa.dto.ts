import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateConversaDto {
  @ApiProperty()
  @IsString()
  public mensagem: string[];

  @ApiProperty()
  @IsString()
  public utterances: string[];

  @ApiProperty()
  @IsString()
  public intent: string;

  @ApiProperty()
  @IsString()
  public nextIntent: string;

  @ApiProperty()
  @IsString()
  public template: string;

  @ApiProperty()
  @IsArray()
  public quickReplies: [
    {
      text: string;
      next_intent: string;
    },
  ];

  @ApiProperty()
  @IsString()
  projeto: string;
}
