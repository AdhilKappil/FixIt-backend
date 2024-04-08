import { ServiceRepository } from "../../../infrastructureLayer/database/repository/serviceRepository";
import ErrorResponse from "../../handler/errorResponse";
import { IServiceRepository } from "../../interface/repository/IserviceRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";


// create new service
export const createService = async (
  requestValidator: IRequestValidator,
  serviceRepository: IServiceRepository,
  serviceName: string,
  firstHourCharge: number,
  laterHourCharge: number,
  description: string,
  service_img: string
): Promise<string> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { serviceName, firstHourCharge, laterHourCharge, description, service_img },
      [
        "serviceName",
        "firstHourCharge",
        "laterHourCharge",
        "description",
        "service_img",
      ]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const service = await serviceRepository.findService(serviceName); // checking if the service exist or not
    if (!service) {
      const newService = {
        serviceName,
        firstHourCharge,
        laterHourCharge,
        description,
        service_img,
      };
      const createnewUser = await serviceRepository.createService(newService);
      return createnewUser
    }
    throw ErrorResponse.badRequest("Service already exist");
  } catch (err) {
    throw err;
  }
};
