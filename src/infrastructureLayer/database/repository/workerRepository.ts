import { IWorker } from "../../../domainLayer/worker";
import { IWorkerRepository } from "../../../usecaseLayer/interface/repository/IworekerRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/Iresponse";
import WorkerModel from "../model/workerModel";
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

}
