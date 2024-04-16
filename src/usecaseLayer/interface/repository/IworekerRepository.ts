import { IWorker } from "../../../domainLayer/worker";
import { StoreData } from "../services/Iresponse";


export interface IWorkerRepository {
  createWorker(newWorker: IWorker): Promise<string>;
  findWorker(email: string): Promise<StoreData | null>;
}