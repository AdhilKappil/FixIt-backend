
export interface IMessage {
    conversationId : string;
    senderId : string;
    receiverId:string;
    text: string;
    status?:boolean;
}