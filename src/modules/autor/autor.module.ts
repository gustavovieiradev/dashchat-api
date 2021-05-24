import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { AutorSchema } from './schemas/autor.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Autor,
          schema: AutorSchema,
          collection: TabelaMongodb.Autor,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [AutorController],
  providers: [AutorService]
})
export class AutorModule {}
