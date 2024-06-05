import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const addPayment = async (
  requestValidator: IRequestValidator,
  bokkingRepository: IBookingRepository,
  price:number,
  _id: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { price ,_id},
      [ "price", "_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const createBooking = await bokkingRepository.addPayment(price, _id);
      return {
        status: 200,
        success: true,
        message: createBooking
      };
    
   
  } catch (err) {
    throw err;
  }
};
