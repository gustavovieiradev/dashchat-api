import { Injectable } from '@nestjs/common';
import { CreateSessaoEntradaDto } from './dto/create-sessao-entrada.dto';
import { UpdateSessaoEntradaDto } from './dto/update-sessao-entrada.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISessaoEntrada } from './schemas/sessao-entrada.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class SessaoEntradaService {
  constructor(
    @InjectModel(TabelaMongodb.SessaoEntrada) private readonly model: Model<ISessaoEntrada>,
  ) {}

  async create(createProjetoDto: CreateSessaoEntradaDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<ISessaoEntrada> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<ISessaoEntrada> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<ISessaoEntrada> {
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
