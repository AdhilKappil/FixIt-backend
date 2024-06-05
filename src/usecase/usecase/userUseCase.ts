import { IUser } from "../../domain/user";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import INodemailer from "../interface/services/Inodemailer";
import { addProfile } from "./user/addProfile";
import { createUser } from "./user/createUser";
import { emailVeification } from "./user/emailVerification";
import { forgotPassword } from "./user/forgotPassword";
import { googleAuth } from "./user/googleAuth";
import { loginUser } from "./user/loginUser";
import { verifyEmail } from "./user/sendEmail";
import { sendOtpFogotPassword } from "./user/sendOtpForgotPassword";
import { updateProfile } from "./user/updateProfile";


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


  //to add pfofile image
  async addProfile({
     profile_img,
     _id,
  }: {
  profile_img : string,
  _id : string
  }) {
    return addProfile(
      this.requestValidator,
      this.userRepository,
      profile_img,
      _id
    );
  }

  //to update profile
  async updateProfile({
     _id,
     name,
     mobile
  }: {
  _id : string,
  name : string,
  mobile : string
  }) {
    return updateProfile(
      this.requestValidator,
      this.userRepository,
      _id,
      name,
      mobile
    );
  }


  //to create user
  async googleAuth({
    name,
    email,
    password,
  }: {
    name: string;
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


   //to send OTP to verify the user's detail
   async sendOtpFogotPassword({ email, name }: { email: string; name: string }) {
    return sendOtpFogotPassword(this.requestValidator,this.userRepository, this.nodemailer, email, name);
  }

   //to save forgot password user
   async forgotPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return forgotPassword(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  

}
