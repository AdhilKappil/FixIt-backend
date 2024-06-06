import { IConversation } from "../../../domain/conversation";
import { IMessage } from "../../../domain/message";
import {  IConversationData, MessageResponse } from "../services/Iresponse";


export interface IChatRepository {
    createConversation(senderId:string, receiverId:string): Promise<string>;
    findConversation(senderId:string, receiverId:string): Promise<IConversationData | undefined>;
    createMessage(newMessage:IMessage): Promise<IMessage>;
    getMessage(conversationId:string): Promise<MessageResponse | null>;
    getUnReadMessages(id:string): Promise<MessageResponse | null>;
    viewMessages(_id:string[]): Promise<string>;
}