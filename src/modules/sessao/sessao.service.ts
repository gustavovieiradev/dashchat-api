import { Injectable } from '@nestjs/common';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISessao } from './schemas/sessao.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class SessaoService {
  constructor(
    @InjectModel(TabelaMongodb.Sessao) private readonly model: Model<ISessao>,
  ) {}

  async create(createProjetoDto: CreateSessaoDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<ISessao> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<ISessao> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<ISessao> {
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
