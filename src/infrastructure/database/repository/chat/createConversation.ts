import ConversationModel from "../../model/conversation";


// Creating new user
export const createConversation = async (
    senderId : string,
    receiverId : string,
    conversationModel: typeof ConversationModel
): Promise<string> => {
    try {
        const newConversation = await conversationModel.create({
            members: [senderId,receiverId],
          });
        await newConversation.save()
        return "Successfully created a new conversation";
    } catch (error) {
        throw error
    }
}