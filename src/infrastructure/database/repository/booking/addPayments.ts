import BookingModel from "../../model/bookingModel";

export const addPayment = async (
  price:number,
  _id:string,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    const order = await bookingModel.findOne({_id})
    if(order){
      if(order.price && order.price>1){
        return "You already generated the bill"
      }
          order.price = price
          order.status = "completed"
          await order.save()
          return "Thank you for your service"
    }else{
        return "Something is went wrong"
    }
  } catch (error) {
    throw error;
  }
};
