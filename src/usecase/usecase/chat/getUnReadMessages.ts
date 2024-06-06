import ErrorResponse from "../../handler/errorResponse";
import { IChatRepository } from "../../interface/repository/IchatRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { MessageResponse } from "../../interface/services/Iresponse";


// create new conversation
export const getUnReadMessages = async (
  requestValidator: IRequestValidator,
  chatRepository: IChatRepository,
  id:string

): Promise<MessageResponse | null> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {id},
      [
        "id",
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const message = await chatRepository.getUnReadMessages(id); 
    if (message) {
        return message
    }
    return null
  } catch (err) {
    throw err;
  }
};
