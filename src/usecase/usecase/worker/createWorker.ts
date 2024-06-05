import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import IHashpassword from "../../interface/services/Ihashpassword";
import { IResponse } from "../../interface/services/Iresponse";

export const createWorker = async (
  requestValidator: IRequestValidator,
  workerRepository: IWorkerRepository,
  bcrypt: IHashpassword,
  name: string,
  mobile: string,
  email: string,
  password: string,
  district: string,
  service: string,
  experience: number,
  idCard_img: string,
  profile_img?: string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {
        name,
        mobile,
        email,
        password,
        service,
        experience,
        idCard_img,
        profile_img,
        district,
      },
      [
        "name",
        "mobile",
        "email",
        "password",
        "service",
        "experience",
        "idCard_img",
        "profile_img",
        "district",
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const worker = await workerRepository.findWorker(email); // checking if the Worker exist or not
    if (!worker) {
      const hashedPassword = await bcrypt.createHash(password);
      const newWorker = {
        name,
        mobile,
        email,
        password: hashedPassword,
        service,
        experience,
        idCard_img,
        profile_img,
        district,
      };
      const createNewWorker = await workerRepository.createWorker(newWorker);

      return {
        status: 200,
        success: true,
        message: createNewWorker

      };
    }
    throw ErrorResponse.badRequest("Worker already exist");
  } catch (err) {
    throw err;
  }
};
