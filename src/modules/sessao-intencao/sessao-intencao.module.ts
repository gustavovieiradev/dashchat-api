import { Module } from '@nestjs/common';
import { SessaoIntencaoService } from './sessao-intencao.service';
import { SessaoIntencaoController } from './sessao-intencao.controller';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { SessaoIntencaoSchema } from './schemas/sessao-intencao.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.SessaoIntencao,
          schema: SessaoIntencaoSchema,
          collection: TabelaMongodb.SessaoIntencao,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [SessaoIntencaoController],
  providers: [SessaoIntencaoService]
})
export class SessaoIntencaoModule {}
