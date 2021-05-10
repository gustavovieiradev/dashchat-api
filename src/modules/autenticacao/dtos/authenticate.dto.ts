import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class AuthenticateDto {

    @ApiProperty()
    @IsString()
    public produto: string;

    @ApiProperty()
    @IsString()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;
}
