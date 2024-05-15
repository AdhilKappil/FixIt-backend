import BookingModel from "../../../infrastructureLayer/database/model/bookingModel";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { BookingResponse } from "../../interface/services/Iresponse";

export const getBokkings = async (
  requestValidator: IRequestValidator,
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
    

    if(workerId){   
      const booking = await BookingModel.find({workerId,status})
      return {
          status: 200,
          success: true,
          data: booking
        };
    }

    if(service){
      const booking = await BookingModel.find({service,status})
      return {
          status: 200,
          success: true,
          data: booking
        };
    }

    if(status === "all"){
      const booking = await BookingModel.find({ userId, status: { $ne: "cancelled" } });
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
