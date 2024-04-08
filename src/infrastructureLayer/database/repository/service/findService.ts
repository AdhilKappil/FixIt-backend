
import ServiceModel from "../../model/serviceModel";

export const findService = async(
    serviceName: string,
    serviceModel: typeof ServiceModel
) => {
   try {
     console.log('name in findByService in userRepository --->>>> ', serviceName)
        const existingService = await serviceModel.findOne({ serviceName: serviceName });
        console.log(existingService)
        return existingService
   } catch (error) {
        throw error
   }
}