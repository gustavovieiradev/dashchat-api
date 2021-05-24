import { Module } from '@nestjs/common';
import { SessaoEntradaService } from './sessao-entrada.service';
import { SessaoEntradaController } from './sessao-entrada.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { SessaoEntradaSchema } from './schemas/sessao-entrada.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.SessaoEntrada,
          schema: SessaoEntradaSchema,
          collection: TabelaMongodb.SessaoEntrada,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [SessaoEntradaController],
  providers: [SessaoEntradaService]
})
export class SessaoEntradaModule {}
