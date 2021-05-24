import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IHistorico extends Document {
  nome: string;
}

export const HistoricoSchema: Schema = new Schema({
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
const Historico: Model<IHistorico> = mongoose.model<IHistorico>(
  TabelaMongodb.Historico,
  HistoricoSchema,
);
export default Historico;
