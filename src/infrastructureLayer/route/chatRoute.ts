import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

//routes for forgot password otp verification
// router.post(
//     "/sendOTPforgotPassword",
//     (req: Request, res: Response, next: NextFunction) =>
//       userAdapter.sednOtpFogotPassword(req, res, next)
//   );