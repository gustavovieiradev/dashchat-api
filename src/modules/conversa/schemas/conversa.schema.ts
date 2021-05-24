import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IConversa extends Document {
  nome: string;
}

export const ConversaSchema: Schema = new Schema({
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
const Conversa: Model<IConversa> = mongoose.model<IConversa>(
  TabelaMongodb.Conversa,
  ConversaSchema,
);
export default Conversa;
