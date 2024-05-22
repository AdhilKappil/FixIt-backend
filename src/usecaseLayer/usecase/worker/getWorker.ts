import { IWorker } from "../../../domainLayer/worker";
import ErrorResponse from "../../handler/errorResponse";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import { IWorkerResponse } from "../../interface/services/Iresponse";


export const getWorker = async (
  email:string,
  workerRepository: IWorkerRepository
): Promise<IWorkerResponse> => {
  try {
    const worker: IWorker | null = await workerRepository.findWorker(email);
    if (worker && worker._id) {
        worker.password = ""
        return {
          status: 200,
          success: true,
          data: worker,
          message: "",
        };
      }
      throw ErrorResponse.badRequest("Wrong password or email");
  } catch (err) {
    throw err;
  }
};
