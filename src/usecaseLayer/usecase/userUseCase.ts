import { IUser } from "../../domainLayer/user";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import INodemailer from "../interface/services/Inodemailer";
import { createUser } from "./user/createUser";
import { emailVeification } from "./user/emailVerification";
import { googleAuth } from "./user/googleAuth";
import { loginUser } from "./user/loginUser";
import { verifyEmail } from "./user/sendEmail";


export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
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
      this.jwt,
      name,
      mobile,
      email,
      password
    );
  }


  //to create user
  async googleAuth({
    name,
    email,
    password,
  }: {
    name: string;
    mobile: string;
    email: string;
    password: string;
  }) {
    return googleAuth(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      email,
      password
    );
  }

// user can login here
  async loginUser({ email, password }: { email: string; password: string }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  //to send OTP to verify the user's detail
  async verifyEmail({ email, name }: { email: string; name: string }) {
    return verifyEmail(this.requestValidator,this.userRepository, this.nodemailer, email, name);
  }

  //to check if the user entered OTP is correct or not
  async emailVeification({ otp, email }: { otp: string; email: string }) {
    return emailVeification(this.requestValidator, this.nodemailer, otp, email);
  }
  

}
