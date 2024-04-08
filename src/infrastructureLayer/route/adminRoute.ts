
import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import { serviceAdapter } from "./injections/serviceInjection";


const router = express.Router();


  // roure for admin login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req, res, next)
);

 // roure for get user data
 router.get(
  "/getUsers",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getUsers(req, res, next)
);

// roure for get user data
router.patch(
  "/users/unblock-block",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);

// ============= Service related routes ================= //

  // roure for admin login
  router.post(
    "/createService",
    (req: Request, res: Response, next: NextFunction) =>
      serviceAdapter.createService(req, res, next)
  );


  
export default router  
