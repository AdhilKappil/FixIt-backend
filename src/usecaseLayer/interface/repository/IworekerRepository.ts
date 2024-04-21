import { IWorker } from "../../../domainLayer/worker";
import { RequesEmailData } from "../services/Iresponse";


export interface IWorkerRepository {
  createWorker(newWorker: IWorker): Promise<string>;
  findWorker(email: string): Promise<IWorker | null>;
  acceptOrRejectRequest(id: string, status:string): Promise<RequesEmailData>;
  blockWorker(_id: string): Promise<string | null>;
}
