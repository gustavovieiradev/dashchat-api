import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IAutor extends Document {
  nome: string;
}

export const AutorSchema: Schema = new Schema({
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
const Autor: Model<IAutor> = mongoose.model<IAutor>(
  TabelaMongodb.Autor,
  AutorSchema,
);
export default Autor;
