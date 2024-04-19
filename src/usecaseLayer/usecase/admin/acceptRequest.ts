import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import { IResponse } from "../../interface/services/Iresponse";


export const acceptOrRejectRequest = async (
  requestValidator: IRequestValidator,
  workerRepository : IWorkerRepository,
  id : string,
  status : string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {id,status },
      ["id","status"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }
      await workerRepository.acceptOrRejectRequest(id,status);
      return {
        status: 200,
        success: true,
        message: "Worker Request successfully Updated",
      };
    }catch(err){
        throw err;
    }
 
};
