import WorkerModel from "../../../infrastructureLayer/database/model/workerModel";
import { IWorkerResponse } from "../../interface/services/Iresponse";


export const getJoinRequests = async (): Promise<IWorkerResponse> => {
  try {
    const users = await WorkerModel.find({}).select("-password");
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
