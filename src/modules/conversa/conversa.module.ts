import { Module } from '@nestjs/common';
import { ConversaService } from './conversa.service';
import { ConversaController } from './conversa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { ConversaSchema } from './schemas/conversa.schema';
import { AutorSchema } from '../autor/schemas/autor.schema';
import { SessaoSchema } from '../sessao/schemas/sessao.schema';
import { HistoricoSchema } from '../historico/schemas/historico.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Conversa,
          schema: ConversaSchema,
          collection: TabelaMongodb.Conversa,
        },
        {
          name: TabelaMongodb.Autor,
          schema: AutorSchema,
          collection: TabelaMongodb.Autor,
        },
        {
          name: TabelaMongodb.Sessao,
          schema:  SessaoSchema,
          collection: TabelaMongodb.Sessao,
        },
        {
          name: TabelaMongodb.Historico,
          schema:  HistoricoSchema,
          collection: TabelaMongodb.Historico,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [ConversaController],
  providers: [ConversaService]
})
export class ConversaModule {}
