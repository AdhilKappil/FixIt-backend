
import { IBooking } from "../../../../domainLayer/booking";
import BookingModel from "../../model/bookingModel";

// Creating new order
export const bookService = async (
  newOrder: IBooking,
  bookingModel: typeof BookingModel
): Promise<string> => {
  try {
    const user = await bookingModel.create(newOrder);
    await user.save();
    return "Please wait patiently for confirmation from the worker. Thank you for choosing our service!";
  } catch (error) {
    throw error;
  }
};
