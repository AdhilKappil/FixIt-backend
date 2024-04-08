import { IAdmin } from "../../../domainLayer/admin";
import { IUser } from "../../../domainLayer/user";


export interface Response<T = IUser| IUser[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}



export interface AdminData {
  _id: string;
  name: string;
}

// Modify the Response interface to use AdminData as the generic type for data
export interface AdminResponse<T = AdminData | string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}

