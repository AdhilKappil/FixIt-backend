import { IWorker } from "../../../../domainLayer/worker";
import WorkerModel from "../../model/workerModel";

export const getWorkers = async(
    workerModels: typeof WorkerModel
):Promise<IWorker[] | never>  => {
    try {
        const users = await workerModels.find({}).select("-password").sort({createdAt: -1 }) ;
        if (users) {
          return users
        }
        throw new Error("No workers") 
    } catch (error) {
        throw error;
    }
}