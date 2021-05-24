import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ICliente extends Document {
  nome: string;
}

export const ClienteSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  dateConfirmation: {
    type: Date,
    required: false,
  },
});
const Cliente: Model<ICliente> = mongoose.model<ICliente>(
  TabelaMongodb.Cliente,
  ClienteSchema,
);
export default Cliente;
