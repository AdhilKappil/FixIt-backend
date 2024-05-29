import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IResponse } from "../../interface/services/Iresponse";


export const blockUnblockUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  _id : string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {_id },
      ["_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

       await userRepository.blockUser(_id);
      return {
        status: 200,
        success: true,
        message: `Successfully updated`,
      };
    }catch(err){
        throw err;
    }
 
};
