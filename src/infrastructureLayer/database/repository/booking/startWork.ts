import BookingModel from "../../model/bookingModel";

export const startWork = async (
  bookingId: string,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    const order = await bookingModel.findOne({_id:bookingId})
    if(order){
          order.price = 1
          await order.save()
          return "Verification was successful.Now you can start work"
    }else{
        return "Something is went wrong"
    }
  } catch (error) {
    throw error;
  }
};
