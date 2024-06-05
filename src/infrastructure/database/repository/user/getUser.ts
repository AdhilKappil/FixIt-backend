import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

export const getUser = async(
    userModels: typeof UserModel
):Promise<IUser[] | never>  => {
    try {
        const users = await userModels.find({}).select("-password").sort({createdAt: -1 }) ;
        if (users) {
          return users
        }
        throw new Error("No users") 
    } catch (error) {
        throw error;
    }
}