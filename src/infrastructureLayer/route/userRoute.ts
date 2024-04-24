import express, { NextFunction, Request, Response } from "express";
import { userAdapter } from "./injections/userInjection";

const router = express.Router();

// roure for user registration
router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.createUser(req, res, next)
);

// route for user login
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.loginUser(req, res, next)
);

// route user google auth
router.post("/googleAuth", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.googleAuth(req, res, next)
);

// Route for user logout
router.post("/logout", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.logoutUser(req, res, next)
);

// Route for add profile
router.patch("/addProfile", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.addProfile(req, res, next)
);

// Route for update user data
router.patch("/updateProfile", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.updateProfile(req, res, next)
);

//routes for forgot password otp verification
router.post(
  "/sendOTPforgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sednOtpFogotPassword(req, res, next)
);

//routes for forgot password save
router.post(
  "/forgotPassword",
  (req: Request, res: Response, next: NextFunction) =>
    userAdapter.fogotPassword(req, res, next)
);

//routes for email verification and send otp to email
router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.sendEmail(req, res, next)
);

router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
  userAdapter.emailVerification(req, res, next)
);

export default router;
