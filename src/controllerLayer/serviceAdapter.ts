import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { ServiceUseCase } from "../usecaseLayer/usecase/serviceUseCase";

export class ServiceAdapter {
  private readonly serviceusecase: ServiceUseCase;

  constructor(serviceusecase: ServiceUseCase) {
    this.serviceusecase = serviceusecase; // using dependency injection to call the adminusecase
  }


   // @desc    Create Service the user
  //route     Post /api/admin/createServices
  //@access   Private
  async createService(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.serviceusecase.createService(req.body);
      newUser &&
        res.status(200).json({
           newUser
        });
    } catch (err) {
      next(err);
    }
  }

   // @desc    Get all service
  //route     Get /api/admin/getService
  //@access   Private
  async getService(req: Req, res: Res, next: Next) {
    try {
      const service = await this.serviceusecase.getService();
      service &&
        res.status(service.status).json({
          success: service.success,
          data: service.data,
        });
    } catch (err) {
      next(err);
    }
  }

}
