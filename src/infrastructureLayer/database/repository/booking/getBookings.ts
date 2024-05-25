import { BookingResponse } from "../../../../usecaseLayer/interface/services/Iresponse";
import BookingModel from "../../model/bookingModel";


export const getBokkings = async (
  userId: string,
  status: string,
  workerId : string,
  service : string,
  bookingModel: typeof BookingModel
): Promise<BookingResponse> => {
  try {

    if(workerId){   
      const booking = await bookingModel.find({workerId,status})
      return {
          status: 200,
          success: true,
          data: booking
        };
    }

    if(service){
      const booking = await bookingModel.find({service,status})
      return {
          status: 200,
          success: true,
          data: booking
        };
    }

    if(!workerId && !userId && !service){
      const booking = await bookingModel.find({payment:true})
      return {
          status: 200,
          success: true,
          data: booking
        };
    }

    if(status === "all"){
      const booking = await bookingModel.find({ userId, status: { $ne: "cancelled" } });
      return {
          status: 200,
          success: true,
          data: booking
      };
      
    }else{
        const booking = await bookingModel.find({userId, status})
        
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