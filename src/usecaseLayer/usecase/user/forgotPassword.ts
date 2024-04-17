
import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import IHashpassword from "../../interface/services/Ihashpassword";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse } from "../../interface/services/Iresponse";


export const forgotPassword = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt : Ijwt,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {  email, password },
      [  "email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const hashedPassword = await bcrypt.createHash(password);
      const newPassword = {
        email,
        password: hashedPassword,
      };
      const forgotUser = await userRepository.forgotPassword(newPassword);

        const token = jwt.createJWT(forgotUser._id as string, forgotUser.email, "user", forgotUser.name);
        return {
          status: 200,
          success: true,
          message: `Successfully Forgot Password Welcome ${forgotUser.name}`,
          token : token,
          data : forgotUser
        };
     
  } catch (err) {
    throw err;
  }
};
