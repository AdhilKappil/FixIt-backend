
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { Response } from "../../interface/services/Iresponse";


export const verifyEmail = async (
  requestValidator: IRequestValidator,
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
