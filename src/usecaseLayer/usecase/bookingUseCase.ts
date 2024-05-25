import { IAdminRepository } from "../interface/repository/IadminRepository";
import { IBookingRepository } from "../interface/repository/IbookingRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../interface/repository/IworekerRepository";
import IStripe from "../interface/services/IStripe";
import { addPayment } from "./booking/addPayment";
import { bookService } from "./booking/bookService";
import { commitWork } from "./booking/commitWork";
import { createPayment } from "./booking/createPayment";
import { getBokkings } from "./booking/getBookings";
import { paymentConfirmation } from "./booking/paymentConfirmation";

export class BookingUseCase {
  private readonly bookingRepository: IBookingRepository;
  private readonly workerRepository: IWorkerRepository;
  private readonly adminRepository: IAdminRepository;
  private readonly requestValidator: IRequestValidator;
  private readonly stripe : IStripe
  constructor(
    bookingRepository: IBookingRepository,
    workerRepository: IWorkerRepository,
    adminRepository: IAdminRepository,
    requestValidator: IRequestValidator,
    stripe: IStripe
  ) {
    this.bookingRepository = bookingRepository;
    this.workerRepository = workerRepository;
    this.adminRepository = adminRepository;
    this.requestValidator = requestValidator;
    this.stripe = stripe
  }

  //to book service
  async bookService({
    userId,
    service,
    serviceImg,
    firstHourCharge,
    laterHourCharge,
    description,
    date,
    startTime,
    endTime,
    latitude,
    longitude,
  }: {
    userId: string;
    service: string;
    serviceImg:string;
    firstHourCharge : number;
    laterHourCharge : number;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    latitude: number;
    longitude: number;
  }) {
    return bookService(
      this.requestValidator,
      this.bookingRepository,
      userId,
      service,
      serviceImg,
      firstHourCharge,
      laterHourCharge,
      description,
      date,
      startTime,
      endTime,
      latitude,
      longitude
    );
  }


  //to get bookings
  async getBookings({
    userId,
    status,
    workerId,
    service
  }: {
    userId: string;
    status: string;
    workerId: string;
    service: string
  }) {
    return getBokkings(
      this.requestValidator,
      this.bookingRepository,
      userId,
      status,
      workerId,
      service
    );
  }


  //to commit work
  async commitWork({
    workerId,
    status,
    _id
  }: {
    workerId: string;
    status: string;
    _id: string
  }) {
    return commitWork(
      this.requestValidator,
      this.bookingRepository,
      workerId,
      status,
      _id
    );
  }

    //to add payment
    async addPayment({price, _id }: { price:number; _id:string}) {
      return addPayment(this.requestValidator, this.bookingRepository, price, _id);
    }

// adding price and details to webhook
    async createPayment({amount,bookingId,workerId}:{ amount:number,bookingId:string,workerId:string}){
      return createPayment(this.stripe,amount,bookingId,workerId)
  }

  // after payment confirmation logic
  async paymentConfirmation({transactionId,bookingId,workerId,amount}:
    {transactionId:string,bookingId:string,workerId:string,amount:number}){
      return paymentConfirmation(this.bookingRepository,this.workerRepository,this.adminRepository
        ,transactionId,bookingId,workerId,amount)
  }


}
