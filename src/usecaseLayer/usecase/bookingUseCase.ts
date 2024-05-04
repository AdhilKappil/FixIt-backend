import { IBookingRepository } from "../interface/repository/IbookingRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { bookService } from "./booking/bookService";
import { getBokkings } from "./booking/getBookings";

export class BookingUseCase {
  private readonly userRepository: IBookingRepository;
  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IBookingRepository,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    this.requestValidator = requestValidator;
  }

  //to book service
  async bookService({
    userId,
    service,
    serviceImg,
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
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    latitude: number;
    longitude: number;
  }) {
    return bookService(
      this.requestValidator,
      this.userRepository,
      userId,
      service,
      serviceImg,
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
      userId,
      status,
      workerId,
      service
    );
  }


}
