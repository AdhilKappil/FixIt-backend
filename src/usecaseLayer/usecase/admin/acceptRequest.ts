import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";
import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import INodemailer from "../../interface/services/Inodemailer";
import { IResponse } from "../../interface/services/Iresponse";


export const acceptOrRejectRequest = async (
  requestValidator: IRequestValidator,
  workerRepository : IWorkerRepository,
  nodemailer: INodemailer,
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
      // Data base operation
      const worker = await workerRepository.acceptOrRejectRequest(id,status);
      console.log(worker);
      
      // providing a message for worker
       await nodemailer.sendMessageToEmail(worker.email,worker.name,status);

      return {
        status: 200,
        success: true,
        message: "Worker Request successfully Updated",
      };
    }catch(err){
        throw err;
    }
 
};
