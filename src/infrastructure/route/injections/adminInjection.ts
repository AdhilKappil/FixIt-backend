import Nodemailer from "../../services/nodemailer";
import { AdminAdapter } from "../../../controllers/adminAdapter";
import { AdminUseCase } from "../../../usecase/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import UserModel from "../../database/model/userModel";
import WorkerModel from "../../database/model/workerModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { UserRepository } from "../../database/repository/userRepository";
import { WorkerRepository } from "../../database/repository/workerRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const adminRepository = new AdminRepository(AdminModel);
const userRepository = new UserRepository(UserModel);
const workerRepository = new WorkerRepository(WorkerModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const nodemailer = new Nodemailer();
const adminusecase = new AdminUseCase(
  adminRepository,
  userRepository,
  workerRepository,
  bcrypt,
  jwt,  
  requestValidator,
  nodemailer
);
const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter };