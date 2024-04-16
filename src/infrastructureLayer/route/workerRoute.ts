
import express, { NextFunction, Request, Response } from "express";
import { workerAdapter } from "./injections/workerInjection";

const router = express.Router();


// roure for worker registration
router.post(
    "/signup",
    (req: Request, res: Response, next: NextFunction) =>
      workerAdapter.createWorker(req, res, next)
  );

  // route for user login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    workerAdapter.loginWorker(req, res, next)
);

// // Route for user logout
// router.post(
//   "/logout",
//   (req: Request, res: Response, next: NextFunction) =>
//     userAdapter.logoutUser(req, res, next)
// );


  
export default router  
