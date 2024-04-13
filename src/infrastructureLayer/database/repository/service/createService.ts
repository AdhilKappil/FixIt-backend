import { IService } from "../../../../domainLayer/service";
import ServiceModel from "../../model/serviceModel";

// Creating new user
export const createService = async (
    newService: IService,
    serviceModel: typeof ServiceModel
): Promise<string> => {
    try {
        const service = await serviceModel.create(newService);
        await service.save()
        return "Successfully created a new service";
    } catch (error) {
        throw error
    }
}