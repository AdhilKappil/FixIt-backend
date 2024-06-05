import { IWorker } from "../../../../domain/worker";
import WorkerModel from "../../model/workerModel";

// Creating new worker
export const createWorker = async (
    newWorker: IWorker,
    workerModel: typeof WorkerModel
): Promise<string> => {
    try {
        const worker = await workerModel.create(newWorker);
        await worker.save()
        return "Your join request has been sent successfully. Please wait for further updates.";
    } catch (error) {
        throw error
    }
}