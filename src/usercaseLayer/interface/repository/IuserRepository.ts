import { IUser } from "../../../domainLayer/user";


export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser>;
  findUser(email: string): Promise<IUser | null>;
  blockUser(_id: string): Promise<string | null>;
}
