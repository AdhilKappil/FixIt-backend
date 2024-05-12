import { IConversation } from "../../../domainLayer/conversation";
import { IMessage } from "../../../domainLayer/message";
import {  IConversationData, MessageResponse } from "../services/Iresponse";


export interface IChatRepository {
    createConversation(senderId:string, receiverId:string): Promise<string>;
    findConversation(senderId:string, receiverId:string): Promise<IConversationData | undefined>;
    createMessage(newMessage:IMessage): Promise<IMessage>;
    getMessage(conversationId:string): Promise<MessageResponse | null>;
}