import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { BookingUseCase } from "../usecase/usecase/bookingUseCase";

export class BookingAdapter {
  private readonly bookingusecase: BookingUseCase;

  constructor(bookingusecase: BookingUseCase) {
    this.bookingusecase = bookingusecase; // using dependency injection to call the userusecase
  }

  // @desc    Book new service
  //route     POST api/user/bookService
  //@access   Private
  async bookService(req: Req, res: Res, next: Next) {
    try {
      const newOrder = await this.bookingusecase.bookService(req.body);
      newOrder &&
        res.status(newOrder.status).json({
          success: newOrder.success,
          message: newOrder.message,
          data: newOrder.data,
        });
    } catch (err) {
      next(err);
    }
  }

  // @desc    Get bookings
  //route     GET api/user/getBookings
  //@access   Private
  async getBookings(req: Req, res: Res, next: Next) {
    console.log("adapter for get bookings");

    try {
      const userId = req.query.userId as string;
      const status = req.query.status as string;
      const workerId = req.query.workerId as string;
      const service = req.query.service as string;
      const bookings = await this.bookingusecase.getBookings({
        userId,
        status,
        workerId,
        service,
      });
      bookings &&
        res.status(bookings.status).json({
          success: bookings.success,
          message: bookings.message,
          data: bookings.data,
        });
    } catch (err) {
      next(err);
    }
  }

  // @desc Commit new Work
  //route     PATCH /api/worker/commitWork
  //@access   Private
  async commitWork(req: Req, res: Res, next: Next) {
    try {
      const user = await this.bookingusecase.commitWork(req.body);
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

  // @desc  Checking the otp valid or not
  //route     POST api/user/generateBill
  //@access   Public
  async addPayment(req: Req, res: Res, next: Next) {
    try {
      const user = await this.bookingusecase.addPayment(req.body);
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

  // @desc    Pay for the service
  // @route   POST /api/user/payment
  // @access  Private
  async payment(req: Req, res: Res, next: Next) {
    try {
      console.log("entered");
      const payment = await this.bookingusecase.createPayment(req.body);
      res.status(payment.status).json({
        data: payment.data,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc    Pay for the service
  // @route   POST /api/user/webhook
  // @access  Private
  async webhook(req: Req, res: Res, next: Next) {
    try {
      // Parse the incoming webhook event
      const event = req.body;
      // Check the type of event
      switch (event.type) {
        case "checkout.session.completed":
          // Handle charge succeeded event
          const session = event.data.object;
          const metadata = session.metadata;
          const bookingId = metadata.bookingId;
          const workerId = metadata.workerId;
          const amount = metadata.amount;
          const transactionId = event.data.object.payment_intent;
          await this.bookingusecase.paymentConfirmation({
            transactionId,
            bookingId,
            workerId,
            amount,
          });
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Respond with a success message
      res.status(200).json({ received: true });
    } catch (error) {
      next(error);
    }
  }
}
