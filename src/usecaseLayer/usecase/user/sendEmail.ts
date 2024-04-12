
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { Response } from "../../interface/services/Iresponse";


export const verifyEmail = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  nodemailer: INodemailer,
  email: string,
  name: string
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, name },
      ["email", "name"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email);
    if(user){
      throw ErrorResponse.badRequest("User already exist");
    }

    const verify = await nodemailer.sendEmailVerification(email, name);

    return {
      status: 200,
      success: true,
      message: verify,
    };
  } catch (err) {
    throw err;
  }
};
