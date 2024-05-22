import { IBookingRepository } from "../interface/repository/IbookingRepository";
import { IUserRepository } from "../interface/repository/IuserRepository";
import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../interface/repository/IworekerRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import INodemailer from "../interface/services/Inodemailer";
import { createWorker } from "./worker/createWorker";
import { emailVerification } from "./worker/emailVerification";
import { getWorker } from "./worker/getWorker";
import { loginWorker } from "./worker/loginWorker";
import { sendOtpToEmail } from "./worker/sendOtpToEmail";



export class WorkerUseCase {
  private readonly workerRepository: IWorkerRepository;
  private readonly userRepository: IUserRepository;
  private readonly bookingRepository: IBookingRepository;
  private readonly nodemailer: INodemailer;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    workerRepository: IWorkerRepository,
    userRepository:IUserRepository,
    bookingRepository:IBookingRepository,
    nodemailer : INodemailer,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.workerRepository = workerRepository;
    this.userRepository = userRepository;
    this.bookingRepository = bookingRepository;
    this.nodemailer = nodemailer;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }

  //to create worker
  async createWorker({
    name,
    mobile,
    email,
    password,
    // firstHourCharge,
    // laterHourCharge,
    district,
    service,
    experience,
    idCard_img,
    profile_img,
  }: {
    name: string;
    mobile : string
    email: string;
    password: string;
    // firstHourCharge : number;
    // laterHourCharge : number;
    district : string;
    service : string;
    experience : number;
    idCard_img: string;
    profile_img?: string;
  }) {
    return createWorker(
      this.requestValidator,
      this.workerRepository,
      this.bcrypt,
      name,
      mobile,
      email,
      password,
      // firstHourCharge,
      // laterHourCharge,
      district,
      service,
      experience,
      idCard_img,
      profile_img,
    );
  }

// worker can login here
  async loginWorker({ email, password }: { email: string; password: string }) {
    return loginWorker(
      this.requestValidator,
      this.workerRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  //to send OTP to verify the user's detail
  async sendOtpToEmail({ email, name }: { email: string; name: string }) {
    return sendOtpToEmail(this.requestValidator,this.userRepository, this.nodemailer, email, name);
  }

  //to send OTP to verify the user's detail
  async getWorker(email:string) {
    return getWorker(email,this.workerRepository);
  }

   //to check if the user entered OTP is correct or not
   async emailVerification({ otp, email,bookingId }: { otp: string; email: string,bookingId:string}) {
    return emailVerification(this.requestValidator, this.nodemailer,this.bookingRepository,otp, email, bookingId);
  }



}
