import { IBookingRepository } from "../interface/repository/IbookingRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { bookService } from "./booking/bookService";

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

  //to create user
  async bookService({
    userId,
    service,
    description,
    date,
    startTime,
    endTime,
    latitude,
    longitude,
  }: {
    userId: string;
    service: string;
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
      description,
      date,
      startTime,
      endTime,
      latitude,
      longitude
    );
  }
}
