import { BookingAdapter } from "../../../controllers/bookingAdapter";
import { BookingUseCase } from "../../../usecase/usecase/bookingUseCase";
import AdminModel from "../../database/model/adminModel";
import BookingModel from "../../database/model/bookingModel";
import WorkerModel from "../../database/model/workerModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { BookingRepository } from "../../database/repository/bookinRepository";
import { WorkerRepository } from "../../database/repository/workerRepository";
import StripeService from "../../services/stripe";
import RequestValidator from "../../services/validateRepository";


// creating injection to provide the route
const bookingRepository = new BookingRepository(BookingModel);
const workerRepository = new WorkerRepository(WorkerModel)
const adminRepository = new AdminRepository(AdminModel);
const requestValidator = new RequestValidator();
const stripe = new StripeService()
const bookingceusecase = new BookingUseCase(bookingRepository,workerRepository,adminRepository, requestValidator,stripe);
const bookingAdapter = new BookingAdapter(bookingceusecase);


export { bookingAdapter };