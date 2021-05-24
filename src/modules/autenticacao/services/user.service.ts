import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';
import { IUsuario } from '../schemas/usuario.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(TabelaMongodb.Usuario)
    private readonly userModel: Model<IUsuario>,
    private authService: AuthService,
  ) {}

  async create(data: CreateUserDto): Promise<IUsuario> {
    const pass = await this.authService.transformPasswordMd5(data.password);
    const novoUsuario = {
      name: data.name,
      email: data.email,
      password: pass,
      roles: ['usuario'],
      active: true,
      confirmation: false,
      projeto: data.projeto,
      cliente: data.cliente,
    };
    const existeUsarioEmail = await this.findByEmail(novoUsuario.email);
    if (!existeUsarioEmail) {
      const user = new this.userModel(novoUsuario);
      return await user.save();
    } else {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email): Promise<IUsuario> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id): Promise<IUsuario> {
    return await this.userModel.findById(id).exec();
  }

  async findAll(): Promise<any[]> {
    const usersModel = await this.userModel.find({}).exec();

    const users = usersModel.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        cliente: user.cliente,
        projeto: user.projeto,
      };
    });

    return users;
  }

  async update(email: string, data: any): Promise<IUsuario> {
    return this.userModel.findOneAndUpdate({ email }, data);
  }

  async authenticate(email, password): Promise<IUsuario> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      const pass = await this.authService.transformPasswordMd5(password);
      if (pass.toString() == user.password.toString()) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
