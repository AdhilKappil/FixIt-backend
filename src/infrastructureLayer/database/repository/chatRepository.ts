import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import { IChatRepository } from "../../../usecaseLayer/interface/repository/IchatRepository";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { findConversation } from "./chat/findConversation";

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
  ): Promise<IConversation | null> {
    return findConversation(senderId, receiverId, this.conversationModel);
  }

  // Create new user
  async createMessage(newMessage: IMessage): Promise<IMessage> {
    return createMessage(newMessage, this.messageModel);
  }
}
