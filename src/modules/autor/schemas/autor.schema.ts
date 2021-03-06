import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IAutor extends Document {
  ref: string;
}

export const AutorSchema: Schema = new Schema({
  ref: {
    type: String,
    required: false,
    trim: true,
  },
  guest: {
    type: String,
    required: false,
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
