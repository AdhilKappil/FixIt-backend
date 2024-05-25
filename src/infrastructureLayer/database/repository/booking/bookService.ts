
import { IBooking } from "../../../../domainLayer/booking";
import BookingModel from "../../model/bookingModel";

// Creating new order
export const bookService = async (
  newOrder: IBooking,
  bookingModel: typeof BookingModel
): Promise<IBooking> => {
  try {
    const user = await bookingModel.create(newOrder);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
