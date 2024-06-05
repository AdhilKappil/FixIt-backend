import { IWorker } from "../../../domain/worker";
import { IWorkerRepository } from "../../../usecase/interface/repository/IworekerRepository";
import { RequesEmailData } from "../../../usecase/interface/services/Iresponse";
import WorkerModel from "../model/workerModel";
import { acceptOrRejectRequest } from "./worker/acceptRequest";
import { amountToWallet } from "./worker/amountToWallet";
import { blockWorker } from "./worker/blockWorker";
import { createWorker } from "./worker/createWorker";
import { findWorker } from "./worker/findWorker";
import { getWorkers } from "./worker/getWorkers";


// This class for exporting all the single DB operations togethor 
export class WorkerRepository implements IWorkerRepository {
  constructor(private readonly workerModel: typeof WorkerModel) {}

  // Create new user
  async createWorker(newWorker: IWorker): Promise<string> {
    return createWorker(newWorker, this.workerModel);
  }

   // get all workers
   async getWorkers(): Promise<IWorker[] | never> {
    return getWorkers(this.workerModel)
  }

  // Check if a worker exists using email
  async findWorker(email: string): Promise<IWorker | null> {
    return findWorker(email, this.workerModel);
  }

  // admin can block user
  async acceptOrRejectRequest(id: string,status:string): Promise<RequesEmailData> {
    return acceptOrRejectRequest(id,status,this.workerModel)
  }

    // admin can block worker
    async blockWorker(_id: string): Promise<string | null> {
      return blockWorker(_id,this.workerModel)
    }

    // for add work amount to wallet
    async amountToWallet(workerId: string, workerAmount:number): Promise<string | null> {
      return amountToWallet(workerId,workerAmount,this.workerModel)
    }

}
