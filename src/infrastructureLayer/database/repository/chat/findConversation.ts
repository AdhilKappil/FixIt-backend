import ConversationModel from "../../model/conversation";

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
        console.log(existingConversation)
        return existingConversation
   } catch (error) {
        throw error
   }
}