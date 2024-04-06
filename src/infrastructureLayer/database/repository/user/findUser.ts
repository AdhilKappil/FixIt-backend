import UserModel from "../../model/userModel";


export const findUser = async(
    email: string,
    userModels: typeof UserModel
) => {
   try {
     console.log('email in findUserByEmail in userRepository --->>>> ', email)
        const existingUser = await userModels.findOne({ email: email });
        console.log(existingUser)
        return existingUser
   } catch (error) {
        throw error
   }
}