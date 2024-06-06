import { IChatRepository } from "../interface/repository/IchatRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { createConversation } from "./chat/createConversation";
import { createMessage } from "./chat/createMessage";
import { getMessage } from "./chat/getMessage";
import { viewMessages } from "./chat/viewMessages";


export class ChatUseCase {
  private readonly chatRepository: IChatRepository;
  private readonly requestValidator: IRequestValidator;

  constructor(
    serviceRepository: IChatRepository,
    requestValidator: IRequestValidator
  ) {
    this.chatRepository = serviceRepository;
    this.requestValidator = requestValidator;
  }

  //to create conversation
  async createConversation({
    senderId,
    receiverId
  }: {
    senderId : string,
    receiverId: string
  }) {
    return createConversation(
      this.requestValidator,
      this.chatRepository,
      senderId,
      receiverId
    );
  }


  //to create createMessage
  async createMessage({
    conversationId,
    senderId,
    text
  }: {
    conversationId:string
    senderId : string,
    text: string
  }) {
    return createMessage(
      this.requestValidator,
      this.chatRepository,
      conversationId,
      senderId,
      text
    );
  }


  //to create createMessage
  async viewMessages({
    _id
  }: {
    _id:string[]
  }) {
    return viewMessages(
      this.chatRepository,
      _id
    );
  }


  
  //to create service
  async getMessage(conversationId:string) {
    return getMessage(
      this.requestValidator,
      this.chatRepository,
      conversationId
    );
  }



}
