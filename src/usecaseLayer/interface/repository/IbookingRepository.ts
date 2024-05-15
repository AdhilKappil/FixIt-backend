import { IBooking } from "../../../domainLayer/booking";


export interface IBookingRepository {
  bookService(newOrder: IBooking): Promise<string>;
  commitWork(workerId:string, status:string, _id:string): Promise<string>;
  startWork(bookingId:string): Promise<string>;
}
