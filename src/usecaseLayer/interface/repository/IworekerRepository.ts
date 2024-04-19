import { IWorker } from "../../../domainLayer/worker";
import { StoreData } from "../services/Iresponse";


export interface IWorkerRepository {
  createWorker(newWorker: IWorker): Promise<string>;
  findWorker(email: string): Promise<IWorker | null>;
  acceptOrRejectRequest(id: string, status:string): Promise<string | null>;
}
