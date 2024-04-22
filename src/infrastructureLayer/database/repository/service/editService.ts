import { IService } from "../../../../domainLayer/service";
import ServiceModel from "../../model/serviceModel";

// Creating new user
export const editService = async (
    updateService: IService,
    serviceModel: typeof ServiceModel
): Promise<string> => {
    try {
        const service = await serviceModel.findById(updateService._id);
        if (service) {
           service.serviceName = updateService.serviceName
           service.description = updateService.description
           service.firstHourCharge = updateService.firstHourCharge
           service.laterHourCharge = updateService.laterHourCharge
           service.isBlocked = updateService.isBlocked
           await service.save();
           return "Successfully updated service";
        }else{
            return "Service not found"
        }

    } catch (error) {
        throw error
    }
}