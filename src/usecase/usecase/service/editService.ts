import { ServiceRepository } from "../../../infrastructure/database/repository/serviceRepository";
import ErrorResponse from "../../handler/errorResponse";
import { IServiceRepository } from "../../interface/repository/IserviceRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";


// create new service
export const editService = async (
  requestValidator: IRequestValidator,
  serviceRepository: IServiceRepository,
  _id : string,
  serviceName: string,
  description: string,
  firstHourCharge:number,
  laterHourCharge:number,
  isBlocked : boolean
//   service_img: string
): Promise<string> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { _id,serviceName, description,firstHourCharge,laterHourCharge,isBlocked},
      [
        "_id",
        "serviceName",
        "description",
        "firstHourCharge",
        "laterHourCharge",
        "isBlocked"
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

      const updateService = {
        serviceName,
        description,
        firstHourCharge,
        laterHourCharge,
        isBlocked,
        _id
      };
      const createnewService = await serviceRepository.editService(updateService);
      return createnewService
  } catch (err) {
    throw err;
  }
};
