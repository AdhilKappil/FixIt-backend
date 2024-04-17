import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IuserRepository";
import { IforgotPassword, StoreData } from "../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { blockUser } from "./user/blockUser";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { forgotPassword } from "./user/forgotPassword";


// This class for exporting all the single DB operations togethor 
export class UserRepository implements IUserRepository {
  constructor(private readonly usersModel: typeof UserModel) {}

  // Create new user
  async createUser(newUser: IUser): Promise<StoreData> {
    return createUser(newUser, this.usersModel);
  }

   // Check if a user exists using email
   async findUser(email: string): Promise<IUser | null> {
    return findUser(email, this.usersModel);
  }

  // admin can block user
  async blockUser(_id: string): Promise<string | null> {
    return blockUser(_id,this.usersModel)
  }

  // Create new user
  async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
    return forgotPassword(newPassword, this.usersModel);
  }

}
