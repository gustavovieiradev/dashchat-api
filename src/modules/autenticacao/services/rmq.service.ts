import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import { TipoNotificacaoMq } from '../enums/tipo-notificacao-mq.enum';
import { MessagemRMQ } from '../models/mensagem-rmq.model';

@Injectable()
export class RmqService {
    constructor(@Inject('NOTIFICACAO_SERVICE') private readonly clientEmailSevice: ClientProxy, ) {
    }

    async sendUserNotification(action: TipoNotificacaoMq, data: any, channels = ['EMAIL']) {
        delete data.password;
        delete data.iat;
        delete data.exp;
        const mensagemRmq = {
            action: action,
            data: data,
            channels: channels
        }
        this.clientEmailSevice.emit<any>('user-notificacao', new MessagemRMQ(JSON.stringify(mensagemRmq)));
    }
}
