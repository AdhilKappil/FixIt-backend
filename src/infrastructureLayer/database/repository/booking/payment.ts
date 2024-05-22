import BookingModel from "../../model/bookingModel";

export const payment = async (
    bookingId:string,
  transactionId:string,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    console.log("in payment respository");
    console.log("transaction Id",transactionId);
    console.log("booking id ",bookingId);
    
    
    
    const order = await bookingModel.findOne({_id:bookingId})
    if(order){
          order.payment = true
          order.paymentId = transactionId
          await order.save()
          return "Payment successfully completed"
    }else{
        return "Something is went wrong"
    }
  } catch (error) {
    throw error;
  }
};
