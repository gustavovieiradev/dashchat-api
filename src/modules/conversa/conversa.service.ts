import { HttpService, Injectable } from '@nestjs/common';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IConversa } from './schemas/conversa.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';
import { IAutor } from '../autor/schemas/autor.schema';
import { ISessao } from '../sessao/schemas/sessao.schema';
import { IHistorico } from '../historico/schemas/historico.schema';

@Injectable()
export class ConversaService {
  constructor(
    @InjectModel(TabelaMongodb.Conversa) private readonly model: Model<IConversa>,
    @InjectModel(TabelaMongodb.Autor) private readonly autorModel: Model<IAutor>,
    @InjectModel(TabelaMongodb.Sessao) private readonly sessaoModel: Model<ISessao>,
    @InjectModel(TabelaMongodb.Historico) private readonly historicoModel: Model<IHistorico>,
    private httpService: HttpService
  ) {}

  async create(createProjetoDto: CreateConversaDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async conversa(body) {
    console.log(body)
    let actor = await this.autorModel.findOne({ref: body.ref});
    if (!actor) {
      actor = await this.setRef(body);
    }
    let session = await this.setSession(body, actor);
    let result = await this.getIntent(body, actor, session);
    return result;
  }

  async webhook(projeto, body) {
    let intent = await this.conversa({
      nextIntent: 'TALK',
      ref: body.message.to,
      input: body.message.contents[0].text,
      projeto: projeto,
      wp_return: body
    })
    let msg = ''
    if (intent) {
      msg = intent.mensagem.join('\r\n');
    } else {
      msg = 'Não entendi o que você quis dizer 🤭';
    }

    let resq = await this.httpService.post('',
     {"from":"brick-steed","to":body.message.to,"contents":[{"type":"text","text": msg}]},
     {
       headers: {
         'X-API-TOKEN': 't5LD5KxUCDfXdfS6vipmaGhVZBObPwUMoAI-'
       }
     }
     ).toPromise();
  }

  async findByEmail(email: string): Promise<IConversa> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IConversa> {
    return await this.model.findById(id).exec();
  }

  async setRef(actor) {
    return await new this.autorModel({
      ref: actor.ref
    }).save();
  }

  async setSession(body, actor) {
    let sessao = await this.sessaoModel.findOne({autor: actor, 
      bounce: false});
    if (sessao) {
      return sessao;
    }
    return await new this.sessaoModel({
      autor: actor,
      bounce: false,
      ultimaInteracao: new Date(),
      startTime: new Date(),
    }).save()
  }

  async getIntent (body, actor, init){
    await new this.historicoModel({
      intent: body.input,
      nextIntent: body.nextIntent,
      input: body.input,
      autor: actor,
      tipo: 'sending',
      wp_return: body.wp_return
    }).save();
    let filter:any = {
      intent:'',
      projeto: body.projeto
    }
    var sort = {}
    var score = {}
    if (body.nextIntent && body.nextIntent != 'TALK') {
      filter.intent = body.nextIntent
    }

    if (body.nextIntent == 'TALK') {
      filter = {utterances: { $in: [body.input.toLowerCase()] }}
    }
    let conversation:any = await this.model.findOne(filter, score).sort(sort)
   
    if (!conversation) {
      filter.intent = 'NONE';
      conversation = await this.model.findOne(filter, score).sort(sort)
    }
      if (conversation) {
      await new this.historicoModel({
        intent: body.input,
        nextIntent: conversation.intent,
        input: body.input,
        autor: actor,
        tipo: 'recived',
        conversa: conversation
      }).save();
    }
    return conversation;
  }

  async update(id: string, data: any): Promise<IConversa> {
    const projeto = await this.model.findById(id).exec();
    projeto.nome = data.nome ? data.nome : projeto.nome;
    await projeto.save();
    return projeto;
  }

  async findAll() {
    return await this.model.find({}).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} Projeto`;
  }
}
