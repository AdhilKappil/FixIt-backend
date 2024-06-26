import { IWorker } from "../../../domain/worker";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import IHashpassword from "../../interface/services/Ihashpassword";
import Ijwt from "../../interface/services/Ijwt";
import {  IWorkerResponse } from "../../interface/services/Iresponse";

export const loginWorker = async (
  requestValidator: IRequestValidator,
  workerRepository: IWorkerRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<IWorkerResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const worker: IWorker | null = await workerRepository.findWorker(email);

    if (worker && worker._id) {
      if (worker.isBlocked) {
        throw ErrorResponse.badRequest("Your account is blocked");
      }
      if (worker.status === "pending") {
        throw ErrorResponse.badRequest(
          "Your login will be activated as soon as your request is approved"
        );
      }
      if (worker.status === "reject") {
        throw ErrorResponse.badRequest(
          "Unfortunately, your job request has been rejected"
        );
      }
      const match: boolean = await bcrypt.compare(password, worker.password);
      if (match) {
        const token = jwt.createJWT(
          worker._id,
          worker.email,
          "worker",
          worker.name
        );

        worker.password = ""

        return {
          status: 200,
          success: true,
          token: token,
          data: worker,
          message: `Login successful. Welcome ${worker.name}`,
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
    }

    throw ErrorResponse.notFound("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
