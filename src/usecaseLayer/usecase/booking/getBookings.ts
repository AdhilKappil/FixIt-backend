import BookingModel from "../../../infrastructureLayer/database/model/bookingModel";
import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { BookingResponse, IResponse } from "../../interface/services/Iresponse";

export const getBokkings = async (
  requestValidator: IRequestValidator,
  userId: string,
  status: string
): Promise<BookingResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { userId,status },
      [ "userId","status"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    console.log(`userId${userId} " " status${status}`);

    if(status = "all"){
        const booking = await BookingModel.find({userId})
        return {
            status: 200,
            success: true,
            data: booking
          };
    }else{
        const booking = await BookingModel.find({userId, status})
        return {
            status: 200,
            success: true,
            data: booking
          };
    }
    
  } catch (err) {
    throw err;
  }
};
