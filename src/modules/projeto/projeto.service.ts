import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProjeto } from './schemas/projetos.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectModel(TabelaMongodb.Projeto) private readonly model: Model<IProjeto>,
  ) {}

  async create(createProjetoDto: CreateProjetoDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IProjeto> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IProjeto> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<IProjeto> {
    const projeto = await this.model.findById(id).exec();
    projeto.nome = data.nome ? data.nome : projeto.nome;
    projeto.cliente = data.cliente ? data.cliente : projeto.cliente;
    await projeto.save();
    return projeto;
  }

  async findAll() {
    return await this.model.find({}).populate('cliente').exec();
  }

  async findByCliente(clientId: string) {
    return await this.model.find({ cliente: clientId }).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} Projeto`;
  }
}
