import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { BookingResponse } from "../../interface/services/Iresponse";

export const getBokkings = async (
  requestValidator: IRequestValidator,
  bokkingRepository: IBookingRepository,
  userId: string,
  status: string,
  workerId : string,
  service : string
): Promise<BookingResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { userId,status,workerId,service },
      [ "userId","status","workerId","service"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }
    
  const booking = await bokkingRepository.getBookings(userId,status,workerId,service)
  return booking
    
  } catch (err) {
    throw err;
  }
};
