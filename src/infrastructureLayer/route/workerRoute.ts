
import express, { NextFunction, Request, Response } from "express";
import { workerAdapter } from "./injections/workerInjection";
import AuthMiddleware from "../Middleware/authMiddleware";
import { bookingAdapter } from "./injections/bookingInjection";

const router = express.Router();


// roure for worker registration
router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
      workerAdapter.createWorker(req, res, next)
  );

  // route for worker login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    workerAdapter.loginWorker(req, res, next)
);

// For get bookings
router.get("/getWorker",AuthMiddleware.protectWorker,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.getBookings(req, res, next)
);

// ============== Work related routes =============== //

// For get bookings
router.get("/getBookings",AuthMiddleware.protectWorker,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.getBookings(req, res, next)
);

// For commit work
router.patch("/commitWork",AuthMiddleware.protectWorker,
 (req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.commitWork(req, res, next)
);

// ======== routes for start work and otp verificationn

// for start work otp verification
router.post(
  "/sendOtpToEmail",AuthMiddleware.protectWorker,
  (req: Request, res: Response, next: NextFunction) =>
    workerAdapter.sendOtpToEmail(req, res, next)
);

// route for verify email using otp
router.post("/verifyEmail",AuthMiddleware.protectWorker, 
(req: Request, res: Response, next: NextFunction) =>
  workerAdapter.emailVerification(req, res, next)
);

// route for add add payment
router.post("/generateBill",AuthMiddleware.protectWorker, 
(req: Request, res: Response, next: NextFunction) =>
  bookingAdapter.addPayment(req, res, next)
);

// // Route for user logout
// router.post(
//   "/logout",
//   (req: Request, res: Response, next: NextFunction) =>
//     userAdapter.logoutUser(req, res, next)
// );


  
export default router  
