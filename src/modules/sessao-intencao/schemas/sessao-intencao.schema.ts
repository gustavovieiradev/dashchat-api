import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface ISessaoIntencao extends Document {
  nome: string;
}

export const SessaoIntencaoSchema: Schema = new Schema({
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
const SessaoIntencao: Model<ISessaoIntencao> = mongoose.model<ISessaoIntencao>(
  TabelaMongodb.SessaoIntencao,
  SessaoIntencaoSchema,
);
export default SessaoIntencao;
