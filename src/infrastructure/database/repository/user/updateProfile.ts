import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const updateProfile = async (
    data : Record<string,string>,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
       
        const user = await userModels.findOne({ _id: data._id}).select("-password");
        if (user) {
            // Assuming isStatus is a property on the user model
            user.name = data.name
            user.mobile = data.mobile
            await user.save();
            return user;
        }
        throw new Error("Internal Server Error") 
    } catch (error) {
        throw error;
    }
}
