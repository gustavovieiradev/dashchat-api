import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BancoMongodb } from './shared/enums/banco-mongodb.enum';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { TabelaMongodb } from './shared/enums/tabela-mongodb.enum';
import { UsuarioSchema } from './modules/autenticacao/schemas/usuario.schema';
import { JwtModule } from '@nestjs/jwt';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ProjetoModule } from './modules/projeto/projeto.module';
import { AutorModule } from './modules/autor/autor.module';
import { SessaoModule } from './modules/sessao/sessao.module';
import { HistoricoModule } from './modules/historico/historico.module';
import { SessaoIntencaoModule } from './modules/sessao-intencao/sessao-intencao.module';
import { SessaoEntradaModule } from './modules/sessao-entrada/sessao-entrada.module';
import { ConfiguraModule } from './modules/configura/configura.module';
import { ConversaModule } from './modules/conversa/conversa.module';
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
    ConfigModule,
    AutorModule,
    SessaoModule,
    HistoricoModule,
    SessaoIntencaoModule,
    SessaoEntradaModule,
    ConfiguraModule,
    ConversaModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
