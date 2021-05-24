import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ISessaoIntencao extends Document {
  nome: string;
}

export const SessaoIntencaoSchema: Schema = new Schema({
  interacao: {
    type: String,
    required: true,
    trim: true,
  },
  intent: {
    type: String,
    required: true,
    trim: true,
  },
  sessao: {
    type: Schema.Types.ObjectId,
    ref: 'sessao',
  },
  dateConfirmation: {
    type: Date,
    required: false,
  },
});
const SessaoIntencao: Model<ISessaoIntencao> = mongoose.model<ISessaoIntencao>(
  TabelaMongodb.SessaoIntencao,
  SessaoIntencaoSchema,
);
export default SessaoIntencao;
