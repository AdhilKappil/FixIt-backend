import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IchatRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";


// create new conversation
export const createConversation = async (
  requestValidator: IRequestValidator,
  chatRepository: IChatRepository,
  senderId: string,
  receiverId : string

): Promise<string> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { senderId, receiverId},
      [
        "receiverId",
        "receiverId"
       
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const conversation = await chatRepository.findConversation(senderId,receiverId); // checking if the service exist or not
    if (!conversation) {
      const createnewConversation = await chatRepository.createConversation(senderId,receiverId);
      return createnewConversation
    }
    throw ErrorResponse.badRequest("Service already exist");
  } catch (err) {
    throw err;
  }
};
