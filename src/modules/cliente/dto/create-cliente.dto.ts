import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateClienteDto {

    @ApiProperty()
    @IsString()
    public nome: string;
    
}
