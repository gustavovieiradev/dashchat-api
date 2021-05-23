import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICliente } from './schemas/cliente.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(TabelaMongodb.Cliente) private readonly model: Model<ICliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = new this.model(createClienteDto);
    return await cliente.save();
  }

  async findByEmail(email: string): Promise<ICliente> {
    return await this.model.findOne({ email }).exec();
  }

  async findById(id): Promise<ICliente> {
    return await this.model.findById(id).exec();
  }

  async update(id, data: any): Promise<ICliente> {
    return this.model.findOneAndUpdate({ id: id }, data);
  }

  async findAll() {
    return await this.model.find({}).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
