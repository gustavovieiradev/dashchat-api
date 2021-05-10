import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {

  @ApiProperty()
  @IsString()
  public password: string;

  @ApiProperty()
  @IsString()
  public newPassword: string;
}
