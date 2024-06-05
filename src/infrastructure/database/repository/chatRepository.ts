import { IMessage } from "../../../domain/message";
import { IChatRepository } from "../../../usecase/interface/repository/IchatRepository";
import { IConversationData, MessageResponse } from "../../../usecase/interface/services/Iresponse";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { findConversation } from "./chat/findConversation";
import { getMessage } from "./chat/getMessage";

// This class for exporting all the single DB operations togethor
export class ChatRepository implements IChatRepository {
  constructor(
    private readonly conversationModel: typeof ConversationModel,
    private readonly messageModel: typeof MessageModel
  ) {}

  // Create new conversation
  async createConversation(
    senderId: string,
    receiverId: string
  ): Promise<string> {
    return createConversation(senderId, receiverId, this.conversationModel);
  }

  // Check if a conversation exists using email
  async findConversation(
    senderId: string,
    receiverId: string
  ): Promise<IConversationData | undefined> {
    return findConversation(senderId, receiverId, this.conversationModel);
  }

  // Create new message
  async createMessage(newMessage: IMessage): Promise<IMessage> {
    return createMessage(newMessage, this.messageModel);
  }
  // get all message
  async getMessage(conversationId: string): Promise<MessageResponse | null> {
    return getMessage(conversationId, this.messageModel);
  }

}
