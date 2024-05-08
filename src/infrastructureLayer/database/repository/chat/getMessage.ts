import { MessageResponse } from "../../../../usecaseLayer/interface/services/Iresponse";
import MessageModel from "../../model/message";

export const getMessage = async(
    conversationId:string,
    messageModel: typeof MessageModel
):Promise<MessageResponse | null> => {
   try {
        const message = await messageModel.find({conversationId});
        if(message.length>0){
            return {
                status: 200,
                success: true,
                data: message,
              };
        }
        return null
   } catch (error) {
        throw error
   }
}