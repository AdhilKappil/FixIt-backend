
import { IChatRepository } from "../../interface/repository/IchatRepository";

// create new conversation
export const viewMessages = async (
  chatRepository: IChatRepository,
  _id:string[]
): Promise<string> => {
  try {

    console.log(_id,"array");
    
    const updateStatus = await chatRepository.viewMessages(_id)
    return updateStatus
 
  } catch (err) {
    throw err;
  }
};
