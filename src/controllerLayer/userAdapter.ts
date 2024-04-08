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
          user:newUser.data
        });
    } catch (err) {
      next(err);
    }
  }


  //to login user
  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
        });
    } catch (err) {
      next(err);
    }
  }


  
  //to send the email or verification
  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyEmail(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  //to verify whether the otp send through the email is same as that of the user
  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.emailVeification(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          // data: user.data,
          message:user.message
        });
    } catch (err) {
      next(err);
    }
  }

}
