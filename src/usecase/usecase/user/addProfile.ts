import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import {  IUserResponse } from "../../interface/services/Iresponse";


export const addProfile = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  profile_img:string,
  _id:string
): Promise<IUserResponse> => {
  try {
    
    const validation = requestValidator.validateRequiredFields(
      {profile_img,_id },
      [ "profile_img", "_id"]
    );

    if (!validation.success) {
        console.log('validation');
        
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const updatedUser = await userRepository.addProfile(profile_img,_id);
      
      return {
        status: 200,
        success: true,
        message: `Successfully Uploaded Profile Image`,
        data : updatedUser
      };
    
  } catch (err) {
    throw err;
  }
};
