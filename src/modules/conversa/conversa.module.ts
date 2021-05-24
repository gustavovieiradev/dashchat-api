import { Module } from '@nestjs/common';
import { ConversaService } from './conversa.service';
import { ConversaController } from './conversa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { ConversaSchema } from './schemas/conversa.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Conversa,
          schema: ConversaSchema,
          collection: TabelaMongodb.Conversa,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [ConversaController],
  providers: [ConversaService]
})
export class ConversaModule {}
