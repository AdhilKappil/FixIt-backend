
import mongoose, { Document, Model, Schema } from "mongoose";
import { IMessage } from "../../../domainLayer/message";

const messageSchema: Schema = new Schema<IMessage & Document>(
    {
        conversationId: {
          type: String,
        },
        senderId: {
          type: String,
        },
        text: {
          type: String,
        },
      },
      { timestamps: true }
);

const MessageModel: Model<IMessage & Document> = mongoose.model<IMessage & Document>(
  "Message",
  messageSchema
);

export default MessageModel;