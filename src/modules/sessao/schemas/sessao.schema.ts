import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ISessao extends Document {
  nome: string;
}

export const SessaoSchema: Schema = new Schema({
  bounce: {
    type: Boolean,
    required: true,
    trim: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'autor',
  },
  ultimaInteracao: {
    type: Date,
    required: false,
    trim: true,
  },
  finalTime: {
    type: Date,
    required: false,
    trim: true,
  },
  startTime: {
    type: Date,
    required: false,
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
