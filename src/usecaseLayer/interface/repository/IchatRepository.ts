import { IConversation } from "../../../domainLayer/conversation";


export interface IChatRepository {
    createConversation(senderId:string, receiverId:string): Promise<string>;
    findConversation(senderId:string, receiverId:string): Promise<IConversation | null>;
}