import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BancoMongodb } from './shared/enums/banco-mongodb.enum';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { TabelaMongodb } from './shared/enums/tabela-mongodb.enum';
import { UsuarioSchema } from './modules/autenticacao/schemas/usuario.schema';
import { JwtModule } from '@nestjs/jwt';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProjetoModule } from './modules/projeto/projeto.module';
import * as configJwt from './shared/config-jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionName: BancoMongodb.DASHCHAT,
    }),
    MongooseModule.forFeature(
      [
        {
          name: TabelaMongodb.Usuario,
          schema: UsuarioSchema,
          collection: TabelaMongodb.Usuario,
        },
      ],
      BancoMongodb.DASHCHAT,
    ),
    JwtModule.register({
      secretOrPrivateKey: configJwt.JWT_SECRETO,
      signOptions: {
        expiresIn: configJwt.EXP_JWT,
      },
    }),
    AutenticacaoModule,
    ClienteModule,
    ProjetoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
