import { Injectable } from '@nestjs/common';
import { CreateConversaDto } from './dto/create-conversa.dto';
import { UpdateConversaDto } from './dto/update-conversa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IConversa } from './schemas/conversa.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class ConversaService {
  constructor(
    @InjectModel(TabelaMongodb.Conversa) private readonly model: Model<IConversa>,
  ) {}

  async create(createProjetoDto: CreateConversaDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IConversa> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IConversa> {
    return await this.model.findById(id).exec();
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
