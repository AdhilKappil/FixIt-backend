import { WorkerAdapter } from "../../../controllers/workerAdapter";
import { WorkerUseCase } from "../../../usecase/usecase/workerUseCase";
import BookingModel from "../../database/model/bookingModel";
import UserModel from "../../database/model/userModel";
import WorkerModel from "../../database/model/workerModel";
import { BookingRepository } from "../../database/repository/bookinRepository";
import { UserRepository } from "../../database/repository/userRepository";
import { WorkerRepository } from "../../database/repository/workerRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const workerRepository = new WorkerRepository(WorkerModel);
const userRepository = new UserRepository(UserModel);
const bookingRepository = new BookingRepository(BookingModel);
const nodemailer = new Nodemailer();
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const workerusecase = new WorkerUseCase(
  workerRepository,
  userRepository,
  bookingRepository,
  nodemailer,
  bcrypt,
  jwt,  
  requestValidator
);
const workerAdapter = new WorkerAdapter(workerusecase);

export { workerAdapter};