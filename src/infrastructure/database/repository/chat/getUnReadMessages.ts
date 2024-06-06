import { MessageResponse } from "../../../../usecase/interface/services/Iresponse";
import MessageModel from "../../model/message";

export const getUnReadMessages = async(
    id:string,
    messageModel: typeof MessageModel
):Promise<MessageResponse | null> => {
   try {
        const message = await messageModel.find({receiverId:id,status:false});
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