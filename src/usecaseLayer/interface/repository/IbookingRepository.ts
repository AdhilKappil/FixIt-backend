import { IBooking } from "../../../domainLayer/booking";


export interface IBookingRepository {
  bookService(newOrder: IBooking): Promise<string>;
  commitWork(workerId:string, status:string, _id:string): Promise<string>;
  startWork(bookingId:string): Promise<string>;
  addPayment(price:number, _id:string): Promise<string>;
  payment(bookingId:string,transactionId:string): Promise<string>;
}
