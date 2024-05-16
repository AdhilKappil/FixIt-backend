import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IbookingRepository";
import BookingModel from "../model/bookingModel";
import { addPayment } from "./booking/addPayments";
import { bookService } from "./booking/bookService";
import { commitWork } from "./booking/commitWork";
import { startWork } from "./booking/startWork";



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

  // start work
async startWork(bookingId:string): Promise<string> {
   return startWork(bookingId, this.bookingModel)
}   

  // add payment
async addPayment(price:number, _id:string): Promise<string> {
   return addPayment(price,_id, this.bookingModel)
}   

}
