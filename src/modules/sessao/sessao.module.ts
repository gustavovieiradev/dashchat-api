import { Module } from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { SessaoController } from './sessao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { SessaoSchema } from './schemas/sessao.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Sessao,
          schema: SessaoSchema,
          collection: TabelaMongodb.Sessao,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [SessaoController],
  providers: [SessaoService]
})
export class SessaoModule {}
