import { Injectable } from '@nestjs/common';
import { CreateConfiguraDto } from './dto/create-configura.dto';
import { UpdateConfiguraDto } from './dto/update-configura.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IConfigura } from './schemas/configura.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class ConfiguraService {
  constructor(
    @InjectModel(TabelaMongodb.Configura) private readonly model: Model<IConfigura>,
  ) {}

  async create(createProjetoDto: CreateConfiguraDto) {
    const user = new this.model(createProjetoDto);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IConfigura> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<IConfigura> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: any): Promise<IConfigura> {
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
