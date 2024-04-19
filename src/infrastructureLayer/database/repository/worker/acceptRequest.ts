import { RequesEmailData } from "../../../../usecaseLayer/interface/services/Iresponse";
import WorkerModel from "../../model/workerModel";

// Correct the parameter type for _id
export const acceptOrRejectRequest = async (
    id: string,
    status:string,
    workerModels: typeof WorkerModel
): Promise<RequesEmailData | never> => {
    try {
        const worker = await workerModels.findOne({ _id: id }).select("-password");
        if (worker) {
            worker.status = status
            await worker.save();
            const data = {
                email : worker.email,
                name : worker.name
            }
            return data
        } 
        throw new Error ("Worker not found")
    } catch (error) {
        throw error;
    }
}
