import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IUserResponse } from "../../interface/services/Iresponse";

export const getUsers = async ( userRepository: IUserRepository): Promise<IUserResponse> => {
  try {
    const users = await userRepository.getUser();
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
