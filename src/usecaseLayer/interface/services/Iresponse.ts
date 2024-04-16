import { IAdmin } from "../../../domainLayer/admin";
import { IService } from "../../../domainLayer/service";
import { IUser } from "../../../domainLayer/user";



export interface StoreData {
  _id: string;
  name: string;
  email : string
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



