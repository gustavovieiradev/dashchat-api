import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';
import { ProjetoSchema } from './schemas/projetos.schema';
import { BancoMongodb } from 'src/shared/enums/banco-mongodb.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Projeto,
          schema: ProjetoSchema,
          collection: TabelaMongodb.Projeto,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
})
export class ProjetoModule {}
