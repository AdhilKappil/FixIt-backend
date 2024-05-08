import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import { MessageResponse } from "../services/Iresponse";


export interface IChatRepository {
    createConversation(senderId:string, receiverId:string): Promise<string>;
    findConversation(senderId:string, receiverId:string): Promise<IConversation | null>;
    createMessage(newMessage:IMessage): Promise<IMessage>;
    getMessage(conversationId:string): Promise<MessageResponse | null>;
}