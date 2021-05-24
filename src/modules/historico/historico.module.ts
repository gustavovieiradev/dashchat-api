import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { HistoricoSchema } from './schemas/historico.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Historico,
          schema: HistoricoSchema,
          collection: TabelaMongodb.Historico,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [HistoricoController],
  providers: [HistoricoService]
})
export class HistoricoModule {}
