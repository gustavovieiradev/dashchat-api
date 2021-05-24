import { Module } from '@nestjs/common';
import { ConfiguraService } from './configura.service';
import { ConfiguraController } from './configura.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { ConfiguraSchema } from './schemas/configura.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Configura,
          schema: ConfiguraSchema,
          collection: TabelaMongodb.Configura,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
  ],
  controllers: [ConfiguraController],
  providers: [ConfiguraService]
})
export class ConfiguraModule {}
