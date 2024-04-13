import { ServiceRepository } from "../../../infrastructureLayer/database/repository/serviceRepository";
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
  isBlocked : boolean
//   service_img: string
): Promise<string> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { _id,serviceName, description,isBlocked },
      [
        "_id",
        "serviceName",
        "description",
        "isBlocked"
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    // const service = await serviceRepository.findService(serviceName); // checking if the service exist or not
    // if (!service) {
      const updateService = {
        serviceName,
        description,
        isBlocked,
        _id
        // service_img,
      };
      const createnewService = await serviceRepository.editService(updateService);
      return createnewService
    // }
    // throw ErrorResponse.badRequest("Service already exist");
  } catch (err) {
    throw err;
  }
};
