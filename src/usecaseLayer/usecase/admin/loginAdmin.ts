import { IAdmin } from "../../../domainLayer/admin";
import ErrorResponse from "../../handler/errorResponse";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import IHashpassword from "../../interface/services/Ihashpassword";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse, StoreData } from "../../interface/services/Iresponse";

export const loginAdmin = async (
  requestValidator: IRequestValidator,
  adminRepository: IAdminRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const admin: IAdmin | null = await adminRepository.findAdmin(email);

    if (admin && admin._id) {
      const match: boolean = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.createJWT(
          admin._id,
          admin.email,
          "admin",
          admin.name,
        );

        const responseData: StoreData = {
          _id: admin._id,
          name: admin.name,
          email : admin.email
        };

        return {
          status: 200,
          success: true,
          data: responseData,
          token:token,
          message: `Login successful. Welcome ${admin.name}`,
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }

    throw ErrorResponse.notFound("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
