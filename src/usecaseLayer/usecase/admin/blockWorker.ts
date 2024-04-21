import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import { IResponse } from "../../interface/services/Iresponse";


export const block_unBlockWorker = async (
  requestValidator: IRequestValidator,
  workerRepository: IWorkerRepository,
  _id : string
): Promise<IResponse> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      {_id },
      ["_id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const block = await workerRepository.blockWorker(_id);
      return {
        status: 200,
        success: true,
        message: `Successfully updated`,
      };
    }catch(err){
        throw err;
    }
 
};
