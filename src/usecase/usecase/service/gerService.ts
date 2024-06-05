
import ServiceModel from "../../../infrastructure/database/model/serviceModel";
import { ServiceResponse } from "../../interface/services/Iresponse";

export const getService = async (): Promise<ServiceResponse> => {
  try {
    const service = await ServiceModel.find({})
    return {
      status: 200,
      success: true,
      data: service,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
