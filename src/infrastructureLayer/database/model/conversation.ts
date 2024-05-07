
import mongoose, { Document, Model, Schema } from "mongoose";
import { IConversationSchema } from "../../../domainLayer/conversation";

const conversationSchema: Schema = new Schema<IConversationSchema & Document>(
    {
        members: {
            type: [{ type: String }],
        },
      },   

  {
    timestamps: true,
  }
);

const ConversationModel: Model<IConversationSchema & Document> = mongoose.model<IConversationSchema & Document>(
  "Conversation",
  conversationSchema
);

export default ConversationModel;