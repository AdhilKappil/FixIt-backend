import UserModel from "../../../infrastructureLayer/database/model/userModel";
import { Response } from "../../interface/services/Iresponse";

export const getUsers = async (): Promise<Response> => {
  try {
    const users = await UserModel.find({}).select("-password");
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
