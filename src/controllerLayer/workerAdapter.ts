
import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { WorkerUseCase } from "../usecaseLayer/usecase/workerUseCase";

export class WorkerAdapter {
  private readonly workerusecase: WorkerUseCase;

  constructor(workerusecase: WorkerUseCase) {
    this.workerusecase = workerusecase; // using dependency injection to call the workerusecase
  }

  // @desc    Join Request new worker
  //route     POST api/worker/singup
  //@access   Public
  async createWorker(req: Req, res: Res, next: Next) {
    try {
      const newWorker = await this.workerusecase.createWorker(req.body);
      newWorker &&
       
      res.status(newWorker.status).json({
        success: newWorker.success,
        message: newWorker.message
      });
    } catch (err) {
      next(err);
    }
  }

   // @desc  Register new user
  //route     POST api/user/login
  //@access   Public
  async loginWorker(req: Req, res: Res, next: Next) {
    try {
      const worker = await this.workerusecase.loginWorker(req.body);
      worker &&
        res.cookie("workerjwt", worker.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(worker.status).json({
        success: worker.success,
        data: worker.data,
        message: worker.message,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc    Logout user / clear cookie
  // @route   POST /api/user/logout
  // @access  Public
//   async logoutUser(req: Req, res: Res, next:Next) {
//     try {
//       res.cookie("jwt", "", {
//         httpOnly: true,
//         expires: new Date(0),
//       });
//       res.status(200).json({ message: "Logged out successfully" });
//     } catch (err) {
//       next(err)
//     }
//   }
}
