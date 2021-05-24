import { Injectable } from '@nestjs/common';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHistorico } from './schemas/historico.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectModel(TabelaMongodb.Historico) private readonly model: Model<IHistorico>,
  ) {}

  async create(createProjetoDto: CreateHistoricoDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IHistorico> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IHistorico> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<IHistorico> {
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
