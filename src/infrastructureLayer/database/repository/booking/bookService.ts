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
    return "Your booking has been successfully completed and is now in progress. Please wait patiently for confirmation from the worker. Thank you for choosing our service!";
  } catch (error) {
    throw error;
  }
};
