import { IWorker } from "../../../domainLayer/worker";
import { IWorkerRepository } from "../../../usecaseLayer/interface/repository/IworekerRepository";
import { RequesEmailData } from "../../../usecaseLayer/interface/services/Iresponse";
import WorkerModel from "../model/workerModel";
import { acceptOrRejectRequest } from "./worker/acceptRequest";
import { amountToWallet } from "./worker/amountToWallet";
import { blockWorker } from "./worker/blockWorker";
import { createWorker } from "./worker/createWorker";
import { findWorker } from "./worker/findWorker";


// This class for exporting all the single DB operations togethor 
export class WorkerRepository implements IWorkerRepository {
  constructor(private readonly workerModel: typeof WorkerModel) {}

  // Create new user
  async createWorker(newWorker: IWorker): Promise<string> {
    return createWorker(newWorker, this.workerModel);
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
