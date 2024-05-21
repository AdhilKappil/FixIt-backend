import { BookingAdapter } from "../../../controllerLayer/bookingAdapter";
import { BookingUseCase } from "../../../usecaseLayer/usecase/bookingUseCase";
import BookingModel from "../../database/model/bookingModel";
import { BookingRepository } from "../../database/repository/bookinRepository";
import StripeService from "../../services/stripe";
import RequestValidator from "../../services/validateRepository";



// creating injection to provide the route
const bookingRepository = new BookingRepository(BookingModel);
const requestValidator = new RequestValidator();
const stripe = new StripeService()
const bookingceusecase = new BookingUseCase(bookingRepository, requestValidator,stripe);
const bookingAdapter = new BookingAdapter(bookingceusecase);


export { bookingAdapter };