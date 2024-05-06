import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IbookingRepository";
import BookingModel from "../model/bookingModel";
import { bookService } from "./booking/bookService";
import { commitWork } from "./booking/commitWork";



// This class for exporting all the single DB operations togethor 
export class BookingRepository implements IBookingRepository {
  constructor(private readonly bookingModel: typeof BookingModel) {}

  // Create new user
  async bookService(newOrder: IBooking): Promise<string> {
    return bookService(newOrder, this.bookingModel);
  }

  // commit work
async commitWork(workerId: string, status: string, _id:string): Promise<string> {
   return commitWork(workerId, status, _id, this.bookingModel)
}   

}
