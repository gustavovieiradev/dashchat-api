import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IConfigura extends Document {
  nome: string;
}

export const ConfiguraSchema: Schema = new Schema({
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
const Configura: Model<IConfigura> = mongoose.model<IConfigura>(
  TabelaMongodb.Configura,
  ConfiguraSchema,
);
export default Configura;
