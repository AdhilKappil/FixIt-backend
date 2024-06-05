
import mongoose, { Document, Model, Schema } from "mongoose";
import { IConversation } from "../../../domain/conversation";

const conversationSchema: Schema = new Schema<IConversation & Document>(
    {
        members: {
            type: [{ type: String }],
        },
      },   

  {
    timestamps: true,
  }
);

const ConversationModel: Model<IConversation & Document> = mongoose.model<IConversation & Document>(
  "Conversation",
  conversationSchema
);

export default ConversationModel;