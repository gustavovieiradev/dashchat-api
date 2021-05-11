import * as mongoose from 'mongoose';
import {Document, Model, Schema} from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IProjeto extends Document {
  nome: string;
}

export const ProjetoSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  dateConfirmation: {
    type: Date,
    required: false
  },
});
const Projeto: Model<IProjeto> = mongoose.model<IProjeto>(TabelaMongodb.Projeto, ProjetoSchema);
export default Projeto;
