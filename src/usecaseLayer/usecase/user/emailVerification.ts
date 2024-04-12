import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { Response } from "../../interface/services/Iresponse";


export const emailVeification = async (
  requestValidator: IRequestValidator,
  nodemailer: INodemailer,
  otp: string,
  email: string
): Promise<Response> => {
  try {
    console.log(email);

    // Validate required parameters
    const validation = requestValidator.validateRequiredFields({ email, otp }, [
      "email",
      "otp",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.verifyEmail(otp, email);
    if (verify) {
      return {
        status: 200,
        success: true,
        message: "Succesfully logged In",
      };
    }
    throw ErrorResponse.badRequest("Wrong OTP");
  } catch (err) {
    throw err;
  }
};
