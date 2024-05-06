
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

// ============== Booking related routes =============== //

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

// // Route for user logout
// router.post(
//   "/logout",
//   (req: Request, res: Response, next: NextFunction) =>
//     userAdapter.logoutUser(req, res, next)
// );


  
export default router  
