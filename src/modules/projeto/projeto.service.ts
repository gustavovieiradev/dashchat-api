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

  async findOne(id: number): Promise<IProjeto> {
    return await this.model.findById(id).exec();
  }

  async update(id: number, data: any): Promise<IProjeto> {
    return this.model.findOneAndUpdate({ id: id }, data);
  }

  async findAll() {
    return await this.model.find({}).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} Projeto`;
  }
}
