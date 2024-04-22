import { IAdmin } from "../../../domainLayer/admin";
import { IService } from "../../../domainLayer/service";
import { IUser } from "../../../domainLayer/user";
import { IWorker } from "../../../domainLayer/worker";



export interface StoreData {
  _id: string;
  name: string;
  email : string,
}

export interface workerResponseData extends StoreData{
  img? : string,
  joinDate? : Date
}

export interface RequesEmailData {
  name : string;
  email: string;
}


export interface IResponse<T = StoreData | string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}

export interface IUserResponse<T = IUser| IUser[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}


export interface ServiceResponse<T = IService| IService[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}


export interface IforgotPassword {
  email : string;
  password : string
}


export interface IWorkerResponse<T = IWorker| IWorker[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token? : string
}



