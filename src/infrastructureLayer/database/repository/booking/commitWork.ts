import BookingModel from "../../model/bookingModel";

export const commitWork = async (
  workerId : string,
  status : string,
  _id: string,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    console.log(_id);
    console.log(workerId);
    console.log(status);
    
    const order = await bookingModel.findOne({_id})
    if(order){
        if(status === "cancelled"){
          order.status = status
          await order.save()
          return "Successfully cancelled the booking"
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
