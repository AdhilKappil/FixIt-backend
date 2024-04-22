import { IRequestValidator } from "../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../interface/repository/IworekerRepository";
import IHashpassword from "../interface/services/Ihashpassword";
import Ijwt from "../interface/services/Ijwt";
import { createWorker } from "./worker/createWorker";
import { loginWorker } from "./worker/loginWorker";



export class WorkerUseCase {
  private readonly workerRepository: IWorkerRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    workerRepository: IWorkerRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.workerRepository = workerRepository;
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

}
