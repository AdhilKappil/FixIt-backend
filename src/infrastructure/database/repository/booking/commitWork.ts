import ErrorResponse from "../../../../usecase/handler/errorResponse";
import BookingModel from "../../model/bookingModel";

export const commitWork = async (
  workerId : string,
  status : string,
  _id: string,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    const order = await bookingModel.findOne({_id})
    if(order?.status === "commited"){
      throw ErrorResponse.badRequest("The work has been already committed just a few seconds ago");
    }
    if(order){
        if(status === "cancelled"){
          order.status = status
          await order.save()
          return "Successfully cancelled the work"
        }else{
          order.status = status
          order.workerId = workerId
          await order.save()
          return "Successfully commited the work"
        }
    }else{
        return "Something is went wrong"
    }
  } catch (error) {
    throw error;
  }
};
