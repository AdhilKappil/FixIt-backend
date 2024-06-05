import { IUser } from "../../../domain/user";
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import IHashpassword from "../../interface/services/Ihashpassword";
import Ijwt from "../../interface/services/Ijwt";
import { IUserResponse } from "../../interface/services/Iresponse";

export const loginUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<IUserResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user: IUser | null = await userRepository.findUser(email);

    if (user && user._id) {
      if (user.isBlocked) {
        throw ErrorResponse.badRequest("Your account is blocked");
      }
      const match: boolean = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.createJWT(user._id, user.email, "user", user.name);
        user.password = ""
        return {
          status: 200,
          success: true,
          token: token,
          data:user,
          message: `Login successful. Welcome ${user.name}`,
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }

    throw ErrorResponse.notFound("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
