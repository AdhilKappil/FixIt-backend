import { IWorker } from "../../../domain/worker";
import { RequesEmailData } from "../services/Iresponse";


export interface IWorkerRepository {
  createWorker(newWorker: IWorker): Promise<string>;
  findWorker(email: string): Promise<IWorker | null>;
  acceptOrRejectRequest(id: string, status:string): Promise<RequesEmailData>;
  blockWorker(_id: string): Promise<string | null>;
  amountToWallet(workerId: string,workerAmount:number): Promise<string | null>;
  getWorkers(): Promise<IWorker[]>;

}
