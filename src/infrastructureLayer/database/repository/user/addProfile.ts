import { IUser } from "../../../../domainLayer/user";
import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const addProfile = async (
    _id: string,
    profile_img:string,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
       
        const user = await userModels.findOne({ _id: _id }).select("-password");
        if (user) {
            // Assuming isStatus is a property on the user model
            user.profile_img = profile_img;
            await user.save();
            return user;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
