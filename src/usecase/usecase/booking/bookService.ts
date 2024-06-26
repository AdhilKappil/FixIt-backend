import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { BookingResponse } from "../../interface/services/Iresponse";

export const bookService = async (
  requestValidator: IRequestValidator,
  bokkingRepository: IBookingRepository,
  userId: string,
  service: string,
  serviceImg:string,
  firstHourCharge : number,
  laterHourCharge : number,
  description: string,
  date: string,
  startTime: string,
  endTime: string,
  latitude:number,
  longitude:number,
): Promise<BookingResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { userId,service,serviceImg,firstHourCharge,laterHourCharge, description,date,startTime,endTime,latitude,longitude },
      [ "userId","service","serviceImg","firstHourCharge","laterHourCharge", "description", "date", "startTime", "endTime", "latitude", "longitude"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const newOrder = {
        userId,
        service,
        serviceImg,
        firstHourCharge,
        laterHourCharge,
        description,
        date,
        startTime,
        endTime,
        latitude,
        longitude
    }
  
      const createBooking = await bokkingRepository.bookService(newOrder);

      return {
        status: 200,
        success: true,
        message: "Please wait patiently for confirmation from the worker. Thank you for choosing our service!",
        data:createBooking
      };
    
   
  } catch (err) {
    throw err;
  }
};
