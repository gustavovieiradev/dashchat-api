import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';
import { TabelaMongodb } from '../../../shared/enums/tabela-mongodb.enum';

export interface IConversa extends Document {
  nome: string;
}

export const ConversaSchema: Schema = new Schema({
  intent: {
    type: String,
    required: true,
    trim: true,
  },
  mensagem: {
    type: [String],
    required: false,
    trim: true,
  },
  template: {
    type: String,
    required: true,
    trim: true,
  },
  nextIntent: {
    type: String,
    required: true,
    trim: true,
  },
  hookIntent: {
    type: String,
    required: false,
    trim: true,
  },
  quickReplies: {
    type: [{
      text:String,
      next_intent: String,
      url_external: String
    }],
    required: false,
    trim: true,
  },
  card: {
    type: {
    text: String,
    subtitle: String,
    img: String,
      buttons:[
        {
          text: String,
          next_intent: String,
          url_external: String
        }
      ]
    },
    required: false,
    trim: true,
  },
  button: {
    type: {
      text: String,
      next_intent: String,
      url_external: String
    },
    required: false,
    trim: true,
  },
  carousel: {
    type: [
      {
        text: String,
        subtitle: String,
        img: String,
        buttons:[
          {
            text: String,
            next_intent: String,
            url_external: String
          }
        ]
      }
    ],
    required: false,
    trim: true,
  },
  utterances: {
    type: [String],
    required: false,
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
