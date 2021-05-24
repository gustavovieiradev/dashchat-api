import { Injectable } from '@nestjs/common';
import { CreateSessaoIntencaoDto } from './dto/create-sessao-intencao.dto';
import { UpdateSessaoIntencaoDto } from './dto/update-sessao-intencao.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISessaoIntencao } from './schemas/sessao-intencao.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class SessaoIntencaoService {
  constructor(
    @InjectModel(TabelaMongodb.SessaoIntencao) private readonly model: Model<ISessaoIntencao>,
  ) {}

  async create(createProjetoDto: CreateSessaoIntencaoDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<ISessaoIntencao> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<ISessaoIntencao> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<ISessaoIntencao> {
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
