
import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userInjection";

const router = express.Router();


// roure for user registration
router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
      userAdapter.createUser(req, res, next)
  );

  // roure for user login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.loginUser(req, res, next)
);

//routes for email verification and send otp to email
router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.sendEmail(req, res, next)
);
router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.emailVerification(req, res, next)
);  

  
export default router  
