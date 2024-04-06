
import { AdminAdapter } from "../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../usercaseLayer/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const userRepository = new AdminRepository(AdminModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
// const publisher = new Publisher();
const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  userRepository,
  bcrypt,
  jwt,  
//   publisher,
  requestValidator
);
const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter, adminusecase };