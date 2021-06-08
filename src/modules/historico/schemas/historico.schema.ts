import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IHistorico extends Document {
  nome: string;
}

export const HistoricoSchema: Schema = new Schema({
  intent: {
    type: String,
    required: false,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    trim: true,
  },
  nextIntent: {
    type: String,
    required: false,
    trim: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'autor',
  },
  conversa: {
    type: Schema.Types.ObjectId,
    ref: 'conversa',
    required: false,
  },
  input: {
    type: String,
    required: false,
    trim: true,
  },
  startTime: {
    type: Date,
    required: false,
  },
  wp_return: {
    type: Object,
    required: false,
  },
});
const Historico: Model<IHistorico> = mongoose.model<IHistorico>(
  TabelaMongodb.Historico,
  HistoricoSchema,
);
export default Historico;
