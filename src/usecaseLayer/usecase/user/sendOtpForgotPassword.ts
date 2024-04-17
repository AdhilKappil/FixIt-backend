import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";

export const sendOtpFogotPassword = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  nodemailer: INodemailer,
  email: string,
  name: string
): Promise<IResponse> => {
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
    if (user) {
      if (user.isBlocked) {
        throw ErrorResponse.badRequest("Your account is blocked");
      }
      const verify = await nodemailer.sendEmailVerification(email, name);
      return {
        status: 200,
        success: true,
        message: verify,
      };
    }
    throw ErrorResponse.badRequest("User not exist");
  } catch (err) {
    throw err;
  }
};
