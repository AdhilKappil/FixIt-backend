import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const commitWork = async (
  requestValidator: IRequestValidator,
  bokkingRepository: IBookingRepository,
  workerId:string,
  status:string,
  _id:string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { workerId, status,_id },
      [ "workerId","status","_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const createBooking = await bokkingRepository.commitWork(workerId,status,_id);
      return {
        status: 200,
        success: true,
        message: createBooking
      };
    
   
  } catch (err) {
    throw err;
  }
};
