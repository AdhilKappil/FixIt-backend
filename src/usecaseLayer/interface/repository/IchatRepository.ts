import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";


export interface IChatRepository {
    createConversation(senderId:string, receiverId:string): Promise<string>;
    findConversation(senderId:string, receiverId:string): Promise<IConversation | null>;
    createMessage(newMessage:IMessage): Promise<IMessage>;
}