import WorkerModel from "../../model/workerModel";

// Correct the parameter type for _id
export const blockWorker = async (
    _id: string,
    workerModels: typeof WorkerModel
): Promise<string | null> => {
    try {
        const worker = await workerModels.findOne({ _id: _id }).select("-password");
        if (worker) {
            // Assuming isStatus is a property on the user model
            worker.isBlocked = !worker.isBlocked;
            await worker.save();
            return "Successfully updated"; // Return success message
        } else {
            return null; // User not found
        }
    } catch (error) {
        throw error;
    }
}
