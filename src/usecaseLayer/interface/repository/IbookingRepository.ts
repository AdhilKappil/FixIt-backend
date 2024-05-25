import { IBooking } from "../../../domainLayer/booking";
import { BookingResponse } from "../services/Iresponse";


export interface IBookingRepository {
  bookService(newOrder: IBooking): Promise<IBooking>;
  commitWork(workerId:string, status:string, _id:string): Promise<string>;
  startWork(bookingId:string): Promise<string>;
  addPayment(price:number, _id:string): Promise<string>;
  payment(bookingId:string,transactionId:string): Promise<string>;
 getBookings(  userId: string,status: string,workerId : string,service : string ): Promise<BookingResponse>;

}
