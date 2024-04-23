
import { IUser } from "../../../../domainLayer/user";
import { IforgotPassword } from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";

// Correct the parameter type for _id
export const forgotPassword = async (
    newPassword : IforgotPassword,
    userModels: typeof UserModel
): Promise<IUser | never> => {
    try {
        const user = await userModels.findOne({ email: newPassword.email });
           if(user){
            user.password = newPassword.password;
            await user.save();
            user.password = ""
            return user;
           }
           throw new Error("Internal Server Error")
    } catch (error) {
        throw error;
    }
}
