import { IUser } from "../../../../domainLayer/user";
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../../model/userModel";


// Here following SOLID principle (sinlge function single responsibilty) 

// Creating new user
export const createUser = async (
    newUser: IUser,
    userModels: typeof UserModel
): Promise<StoreData> => {
    try {
        const user = await userModels.create(newUser);
        await user.save()
        const responseData: StoreData = {
            _id: user._id,
            name: user.name,
            email : user.email
          };
        return responseData;
    } catch (error) {
        throw error
    }
}