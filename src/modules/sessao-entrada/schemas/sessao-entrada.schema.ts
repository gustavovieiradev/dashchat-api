import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ISessaoEntrada extends Document {
  nome: string;
}

export const SessaoEntradaSchema: Schema = new Schema({
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
const SessaoEntrada: Model<ISessaoEntrada> = mongoose.model<ISessaoEntrada>(
  TabelaMongodb.SessaoEntrada,
  SessaoEntradaSchema,
);
export default SessaoEntrada;
