import { Module } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {UserController} from './controllers/user.controller';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ClientsModule, Transport} from '@nestjs/microservices';
import { TabelaMongodb } from '../../shared/enums/tabela-mongodb.enum';
import { BancoMongodb } from '../../shared/enums/banco-mongodb.enum';
import { ConfigModule } from '@nestjs/config';
import { UsuarioSchema } from './schemas/usuario.schema';
import * as configJwt from '../../shared/config-jwt';
import { JwtStrategy } from '../../shared/strategys/jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature([
            { name: TabelaMongodb.Usuario, schema: UsuarioSchema, collection: TabelaMongodb.Usuario },
        ], BancoMongodb.DASHCHAT),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: configJwt.JWT_SECRETO,
            signOptions: {
                expiresIn: configJwt.EXP_JWT,
            },
        }),
        /*ClientsModule.register([
            {
                name: 'NOTIFICACAO_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_ZELLO],
                    queue: 'usuario-notificacao-healthtech',
                    queueOptions: {
                        durable: true
                    },
                },
            }
        ]),*/
    ],
    controllers: [UserController],
    providers: [AuthService, UserService, JwtStrategy],
    exports: [
        UserService
    ]
})

export class AutenticacaoModule {
    constructor() {
        console.log(configJwt.JWT_SECRETO);
    }
}
