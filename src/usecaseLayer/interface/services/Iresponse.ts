import { IBooking } from "../../../domainLayer/booking";
import { IMessage } from "../../../domainLayer/message";
import { IService } from "../../../domainLayer/service";
import { IUser } from "../../../domainLayer/user";
import { IWorker } from "../../../domainLayer/worker";



export interface StoreData {
  _id: string;
  name: string;
  email : string,
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

// for booking response
export interface BookingResponse<T = IBooking| IBooking[]|string> {
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


export interface ConversationResponse<T = IConversationData| IConversationData[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}


export interface MessageResponse<T = IMessage|IMessage[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}

//
export interface IConversationData {
  _id: string;
  members: string[];
  user:string,
  userEmail:string,
  user_profile:string,
  worker:string,
  worker_profile:string
}
