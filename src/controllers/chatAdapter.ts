import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { ChatUseCase } from "../usecase/usecase/chatUseCase";

export class ChatAdapter {
  private readonly chatceusecase: ChatUseCase;

  constructor(chatceusecase: ChatUseCase) {
    this.chatceusecase = chatceusecase; 
  }

  // @desc    Create conversation
  //route     Post /api/chat/conversation
  //@access   Private
  async createConversation(req: Req, res: Res, next: Next) {
    try {
      const newConversation = await this.chatceusecase.createConversation(req.body);
      newConversation &&
        res.status(200).json({
          newConversation
          
        });
    } catch (err) {
      next(err);
    }
  }



  // @desc    Create message
  //route     Post /api/chat/message
  //@access   Private
  async createMessage(req: Req, res: Res, next: Next) {
    try {
      const newConversation = await this.chatceusecase.createMessage(req.body);
      newConversation &&
        res.status(200).json({
          newConversation,
        });
    } catch (err) {
      next(err);
    }
  }



  // @desc    Create conversation
  //route     Post /api/chat/conversation
  //@access   Private
  async getMessage(req: Req, res: Res, next: Next) {
    try {
      const conversationId = req.query.conversationId as string;
      const message = await this.chatceusecase.getMessage(conversationId);
      message &&
        res.status(200).json({
          message
        });
    } catch (err) {
      next(err);
    }
  }

   // @desc    Create message
  //route     Post /api/chat/message
  //@access   Private
  async viewMessages(req: Req, res: Res, next: Next) {
    try {
      console.log("adapter");
      console.log(req.body,"hello");
      
      const message = await this.chatceusecase.viewMessages(req.body);
      message &&
        res.status(200).json({
          message,
        });
    } catch (err) {
      next(err);
    }
  }

}
