import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { ServiceUseCase } from "../usecase/usecase/serviceUseCase";

export class ServiceAdapter {
  private readonly serviceusecase: ServiceUseCase;

  constructor(serviceusecase: ServiceUseCase) {
    this.serviceusecase = serviceusecase; 
  }

  // @desc    Create Service the user
  //route     Post /api/admin/createServices
  //@access   Private
  async createService(req: Req, res: Res, next: Next) {
    try {
      const newService = await this.serviceusecase.createService(req.body);
      newService &&
        res.status(200).json({
          newService,
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

  //  @desc    Get all service
  // route     Get /api/admin/getService
  // @access   Private
  async editService(req: Req, res: Res, next: Next) {
    console.log('edit');
    
    try {
      const service = await this.serviceusecase.editService(req.body);
      console.log(service);
      
      service &&
        res.status(200).json({
          service
        });
    } catch (err) {
      next(err);
    }
  }


}
