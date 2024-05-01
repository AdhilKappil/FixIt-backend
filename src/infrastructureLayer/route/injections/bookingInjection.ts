import { BookingAdapter } from "../../../controllerLayer/bookingAdapter";
import { BookingUseCase } from "../../../usecaseLayer/usecase/bookingUseCase";
import BookingModel from "../../database/model/bookingModel";
import { BookingRepository } from "../../database/repository/bookinRepository";
import RequestValidator from "../../services/validateRepository";



// creating injection to provide the route
const bookingRepository = new BookingRepository(BookingModel);
const requestValidator = new RequestValidator();
const bookingceusecase = new BookingUseCase(bookingRepository, requestValidator);
const bookingAdapter = new BookingAdapter(bookingceusecase);


export { bookingAdapter };