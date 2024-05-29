import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";

export class AdminAdapter {
  private readonly adminusecase: AdminUseCase;

  constructor(adminusecase: AdminUseCase) {
    this.adminusecase = adminusecase; // using dependency injection to call the adminusecase
  }

  // @desc  Login admin
  //route     Post api/admin/login
  //@access   Public
  async loginAdmin(req: Req, res: Res, next: Next) {
    try {
      const admin = await this.adminusecase.loginAdmin(req.body);
      admin &&
        res.cookie("adminjwt", admin.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(admin.status).json({
        success: admin.success,
        data: admin.data,
        message: admin.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc  Get all user
  //route     Get /api/admin/getUsers
  //@access   Private
  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.findAllUser();
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
        });
    } catch (err) {
      next(err);
    }
  }

  // @desc    Block /Unblock the user
  //route     PATCH /api/admin/users/unblock-block
  //@access   Private
  async blockUnblockUser(req: Req, res: Res, next: Next) {
    try {
      const _id = req.query.id as string;
      const user = await this.adminusecase.blockUnblockUser(_id);
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

  // @desc  Get all join requests
  //route     Get /api/admin/getJoinRequests
  //@access   Private
  async getJoinRequests(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.findAllRequests();
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
        });
    } catch (err) {
      next(err);
    }
  }

  // @desc    Accept or reject worker join request
  //route     PATCH /api/admin/worker/accept-rejectReques
  //@access   Private
  async acceptOrRejectRequest(req: Req, res: Res, next: Next) {
    try {
      const user = await this.adminusecase.acceptOrRejectRequest(req.body);
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

  // @desc    Block /Unblock the user
  //route     PATCH /api/admin/users/unblock-block
  //@access   Private
  async block_unBlockWorker(req: Req, res: Res, next: Next) {
    try {
      const _id = req.query.id as string;
      const worker = await this.adminusecase.block_unBlockWorker(_id);
      worker &&
        res.status(worker.status).json({
          success: worker.success,
          data: worker.data,
          message: worker.message,
        });
    } catch (err) {
      next(err);
    }
  }


  // @desc    Logout worker / clear cookie
  // @route   POST /api/worker/logout
  // @access  Public
  async logoutAdmin(req: Req, res: Res, next:Next) {
    try {
      res.cookie("adminjwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err)
    }
  }

}
