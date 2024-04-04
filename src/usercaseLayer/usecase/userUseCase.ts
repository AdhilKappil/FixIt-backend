import { IUser } from "../../domainLayer/user";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import { createUser } from "./user/createUser";


export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
//   private readonly nodemailer: INodemailerRepository;
  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    // nodemailer: INodemailerRepository,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    // this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
  }

  //to create user
  async createUser({
    name,
    mobile,
    email,
    password,
  }: {
    name: string;
    mobile: string;
    email: string;
    password: string;
  }) {
    return createUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      name,
      mobile,
      email,
      password
    );
  }


}
