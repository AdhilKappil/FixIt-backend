import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usercaseLayer/usecase/adminUseCase";

export class AdminAdapter {
  private readonly adminusecase: AdminUseCase;

  constructor(adminusecase: AdminUseCase) {
    this.adminusecase = adminusecase; // using dependency injection to call the adminusecase
  }


  //to login admin
  async loginAdmin(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.loginAdmin(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          // data: user.data,
          message: user.message,
        });
    } catch (err) {
      next(err);
    }
  }


}
