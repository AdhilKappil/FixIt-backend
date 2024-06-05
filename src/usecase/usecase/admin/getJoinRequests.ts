import { IWorkerRepository } from "../../interface/repository/IworekerRepository";
import { IWorkerResponse } from "../../interface/services/Iresponse";


export const getJoinRequests = async (workerRepository: IWorkerRepository): Promise<IWorkerResponse> => {
  try {
    const users = await workerRepository.getWorkers()
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
