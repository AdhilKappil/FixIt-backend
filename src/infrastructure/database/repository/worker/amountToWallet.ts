import WorkerModel from "../../model/workerModel";

// Correct the parameter type for _id
export const amountToWallet = async (
    workerId:string,
    workerAmount:number,
    workerModels: typeof WorkerModel
): Promise<string | null> => {
    try {
        console.log("inside the worekr wallet");
        console.log("workerId",workerId);
        console.log("workerAmount",workerAmount);
        
        
        const worker = await workerModels.findById(workerId).select("-password");
        console.log("worker",worker);
        
        if (worker) {
            worker.wallet = (worker.wallet || 0) + workerAmount;
            const res = await worker.save();
            console.log("res", res);
            return "Successfully updated wallet"; // Return success message
        } else {
            return null; // Worker not found
        }
    } catch (error) {
        throw error;
    }
}
