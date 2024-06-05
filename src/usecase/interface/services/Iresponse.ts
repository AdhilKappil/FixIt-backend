import { IBooking } from "../../../domain/booking";
import { IMessage } from "../../../domain/message";
import { IService } from "../../../domain/service";
import { IUser } from "../../../domain/user";
import { IWorker } from "../../../domain/worker";



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
