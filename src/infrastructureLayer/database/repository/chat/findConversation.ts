// import ConversationModel from "../../model/conversation";

// export const findConversation = async(
//     senderId : string,
//     receiverId : string,
//     conversationModel: typeof ConversationModel
// ) => {
//    try {
//      console.log('name in find conversation in conversationRepository --->>>> ', senderId," ",receiverId)
//         const existingConversation = await conversationModel.findOne({
//             members: { $all: [senderId, receiverId] } 
//           });
//         console.log(existingConversation)
//         return existingConversation
//    } catch (error) {
//         throw error
//    }
// }




import { IConversationData } from "../../../../usecaseLayer/interface/services/Iresponse";
import ConversationModel from "../../model/conversation";
import UserModel from "../../model/userModel";
import WorkerModel from "../../model/workerModel";

export const findConversation = async(
    senderId : string,
    receiverId : string,
    conversationModel: typeof ConversationModel
) => {
   try {
     console.log('name in find conversation in conversationRepository --->>>> ', senderId," ",receiverId)
        const existingConversation = await conversationModel.findOne({
            members: { $all: [senderId, receiverId] } 
          });
          const user = await UserModel.findOne({$or: [ { _id: senderId }, { _id: receiverId }  ] }); 
          const worker = await WorkerModel.findOne({$or: [ { _id: senderId }, { _id: receiverId }  ] }); 
          const data: IConversationData | undefined = existingConversation ? {
            _id: existingConversation._id,
            members: existingConversation.members,
            user: user?.name || '',
            userEmail: user?.email || '',
            user_profile: user?.profile_img || '',
            worker: worker?.name || '',
            worker_profile: worker?.profile_img || ''
        } : undefined;
        
        return data;
   } catch (error) {
        throw error
   }
}