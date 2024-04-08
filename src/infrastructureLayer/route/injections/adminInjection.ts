
import { AdminAdapter } from "../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../usercaseLayer/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import UserModel from "../../database/model/userModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const adminRepository = new AdminRepository(AdminModel);
const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const adminusecase = new AdminUseCase(
  adminRepository,
  userRepository,
  bcrypt,
  jwt,  
  requestValidator
);
const adminAdapter = new AdminAdapter(adminusecase);

export { adminAdapter, adminusecase };