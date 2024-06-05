import WorkerModel from "../../model/workerModel";


export const findWorker = async(
    email: string,
    workerModels: typeof WorkerModel
) => {
   try {
     console.log('email in findWorkerByEmail in workerRepository --->>>> ', email)
        const existingWorker = await workerModels.findOne({ email: email });
        return existingWorker
   } catch (error) {
        throw error
   }
}