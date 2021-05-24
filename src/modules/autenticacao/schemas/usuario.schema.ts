import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IUsuario extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
  google: string;
  facebook: string;
  active: boolean;
  confirmation: boolean;
  dateConfirmation: Date;
  cliente: string;
}

export const UsuarioSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String],
    required: true,
    enum: ['usuario', 'admin'],
    default: ['usuario'],
  },
  google: {
    type: String,
    required: false,
    trim: true,
  },
  facebook: {
    type: String,
    required: false,
    trim: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  confirmation: {
    type: Boolean,
    required: true,
    default: false,
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'clientes',
  },
  dateConfirmation: {
    type: Date,
    required: false,
  },
});
const Usuario: Model<IUsuario> = mongoose.model<IUsuario>(
  TabelaMongodb.Usuario,
  UsuarioSchema,
);
export default Usuario;
