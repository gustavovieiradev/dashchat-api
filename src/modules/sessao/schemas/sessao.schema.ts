import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ISessao extends Document {
  nome: string;
}

export const SessaoSchema: Schema = new Schema({
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
const Sessao: Model<ISessao> = mongoose.model<ISessao>(
  TabelaMongodb.Sessao,
  SessaoSchema,
);
export default Sessao;
