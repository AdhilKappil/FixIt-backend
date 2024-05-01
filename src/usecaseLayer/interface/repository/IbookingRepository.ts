import { IBooking } from "../../../domainLayer/booking";


export interface IBookingRepository {
  bookService(newOrder: IBooking): Promise<string>;
 
}
