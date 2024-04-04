import { IUser } from "../../../domainLayer/user";


export interface Response<T = IUser| IUser[]|string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
}
