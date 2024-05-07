import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { ChatUseCase } from "../usecaseLayer/usecase/chatUseCase";

export class ChatAdapter {
  private readonly chatceusecase: ChatUseCase;

  constructor(chatceusecase: ChatUseCase) {
    this.chatceusecase = chatceusecase; // using dependency injection to call the adminusecase
  }

  // @desc    Create conversation
  //route     Post /api/chat/conversation
  //@access   Private
  async createConversation(req: Req, res: Res, next: Next) {
    try {
      const newConversation = await this.chatceusecase.createConversation(req.body);
      newConversation &&
        res.status(200).json({
          newConversation,
        });
    } catch (err) {
      next(err);
    }
  }


}
