import { IUser } from "../../../domainLayer/user";
import { IforgotPassword, StoreData } from "../services/Iresponse";


export interface IUserRepository {
  createUser(newUser: IUser): Promise<StoreData>;
  findUser(email: string): Promise<IUser | null>;
  blockUser(_id: string): Promise<string | null>;
  forgotPassword(newPassword:IforgotPassword): Promise<StoreData>;
}
