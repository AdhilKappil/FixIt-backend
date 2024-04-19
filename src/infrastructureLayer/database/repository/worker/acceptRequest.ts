import WorkerModel from "../../model/workerModel";

// Correct the parameter type for _id
export const acceptOrRejectRequest = async (
    id: string,
    status:string,
    workerModels: typeof WorkerModel
): Promise<string | null> => {
    try {
        const worker = await workerModels.findOne({ _id: id }).select("-password");
        if (worker) {
            worker.status = status
            await worker.save();
            return "Worker Request successfully Updated"; // Return success message
        } else {
            return null; // worker not found
        }
    } catch (error) {
        throw error;
    }
}
