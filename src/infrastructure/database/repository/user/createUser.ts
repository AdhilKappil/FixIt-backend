import { IUser } from "../../../../domain/user";
import UserModel from "../../model/userModel";


// Here following SOLID principle (sinlge function single responsibilty) 

// Creating new user
export const createUser = async (
    newUser: IUser,
    userModels: typeof UserModel
): Promise<IUser> => {
    try {
        const user = await userModels.create(newUser);
        await user.save()
        user.password = ""
        return user;
    } catch (error) {
        throw error
    }
}