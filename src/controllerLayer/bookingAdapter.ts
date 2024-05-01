
import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { BookingUseCase } from "../usecaseLayer/usecase/bookingUseCase";

export class BookingAdapter {
  private readonly bookingusecase: BookingUseCase;

  constructor(bookingusecase: BookingUseCase) {
    this.bookingusecase = bookingusecase; // using dependency injection to call the userusecase
  }

  // @desc  Register new user
  //route     POST api/user/singup
  //@access   Public
  async bookService(req: Req, res: Res, next: Next) {
    try {
      const newOrder = await this.bookingusecase.bookService(req.body);
      newOrder &&
      res.status(newOrder.status).json({
        success: newOrder.success,
        message: newOrder.message,
      });
    } catch (err) {
      next(err);
    }
  }


}
