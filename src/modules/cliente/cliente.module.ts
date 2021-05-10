import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {MongooseModule} from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { ClienteSchema } from './schemas/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: TabelaMongodb.Cliente, schema: ClienteSchema, collection: TabelaMongodb.Cliente },
    ], BancoMongodb.DASHCHAT)
  ],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
