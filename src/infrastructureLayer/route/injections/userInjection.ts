import { UserAdapter } from "../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../usercaseLayer/usecase/userUseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


// factory pattern
const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
// const nodemailer = new Nodemailer();
// const publisher = new Publisher();
const requestValidator = new RequestValidator();
const userusecase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,  
//   nodemailer,
//   publisher,
  requestValidator
);
const userAdapter = new UserAdapter(userusecase);

export { userAdapter, userRepository };