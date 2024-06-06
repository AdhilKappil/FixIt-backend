
export interface IMessage {
    conversationId : string;
    senderId : string;
    text: string;
    status?:boolean;
}