import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IbookingRepository";
import BookingModel from "../model/bookingModel";
import { bookService } from "./booking/bookService";



// This class for exporting all the single DB operations togethor 
export class BookingRepository implements IBookingRepository {
  constructor(private readonly usersModel: typeof BookingModel) {}

  // Create new user
  async bookService(newOrder: IBooking): Promise<string> {
    return bookService(newOrder, this.usersModel);
  }

}
