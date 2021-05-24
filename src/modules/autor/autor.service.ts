import { Injectable } from '@nestjs/common';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAutor } from './schemas/autor.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class AutorService {
  constructor(
    @InjectModel(TabelaMongodb.Autor) private readonly model: Model<IAutor>,
  ) {}

  async create(createProjetoDto: CreateAutorDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IAutor> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IAutor> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<IAutor> {
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
