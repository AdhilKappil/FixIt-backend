import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usercaseLayer/usecase/userUseCase";

export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase; // using dependency injection to call the userusecase
  }

  //to create the user
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.status(newUser.status).json({
          success: newUser.success,
          message: newUser.message,
        });
    } catch (err) {
      next(err);
    }
  }

}
