import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { ICliente } from './schemas/cliente.schema';
import { TabelaMongodb } from 'src/shared/enums/tabela-mongodb.enum';

@Injectable()
export class ClienteService {

  constructor(
    @InjectModel(TabelaMongodb.Cliente) private readonly model: Model<ICliente>,
) { }

  async create(createClienteDto: CreateClienteDto) {
    const user = new this.model(createClienteDto);
    return await user.save()
  }

  async findByEmail(email): Promise<ICliente> {
    return await this.model
        .findOne({ email })
        .exec();
}

async findById(id): Promise<ICliente> {
    return await this.model
        .findById(id)
        .exec();
}

async update(id, data: any): Promise<ICliente> {
    return this.model.findOneAndUpdate({id: id}, data);
}

 async findAll() {
    return await this.model
        .findOne({ })
        .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
