import { IChatRepository } from "../interface/repository/IchatRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { createConversation } from "./chat/createConversation";


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

  //to create service
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




}
