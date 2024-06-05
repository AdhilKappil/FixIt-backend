import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";


export const emailVerification = async (
  requestValidator: IRequestValidator,
  nodemailer: INodemailer,
  bookkingRepository : IBookingRepository,
  otp: string,
  email: string,
  bookingId:string,
): Promise<IResponse> => {
  try {
  
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields({ email, otp, bookingId }, [
      "email",
      "otp",
      "bookingId"
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.verifyEmailToStartWork(otp, email);
    if (verify) {
        const res = await bookkingRepository.startWork(bookingId)
      return {
        status: 200,
        success: true,
        message: res
      };
    }
    throw ErrorResponse.badRequest("Wrong OTP");
  } catch (err) {
    throw err;
  }
};
