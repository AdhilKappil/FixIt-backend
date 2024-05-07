import { IMessage } from "../../../domainLayer/message";
import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IchatRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";


// create new conversation
export const createMessage = async (
  requestValidator: IRequestValidator,
  chatRepository: IChatRepository,
  conversationId:string,
    senderId : string,
    text: string

): Promise<IMessage> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { conversationId,senderId, text},
      [
        "conversationId",
        "senderId",
        "text"
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    console.log(conversationId,'conversationid');
    

    const newMessage = {
        conversationId,
        senderId,
        text
    }
      const createNewMessage = await chatRepository.createMessage(newMessage);
      return createNewMessage
 
  } catch (err) {
    throw err;
  }
};
