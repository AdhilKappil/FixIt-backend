
import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import { serviceAdapter } from "./injections/serviceInjection";
import AuthMiddleware from "../Middleware/authMiddleware";


const router = express.Router();


  // roure for admin login
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.loginAdmin(req, res, next)
);

 // roure for get user data
 router.get(
  "/getUsers",AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getUsers(req, res, next)
);

// roure for block user
router.patch(
  "/users/unblock-block",AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);

// ============= Service related routes ================= //

  // roure for create service
  router.post(
    "/createService",AuthMiddleware.protectAdmin,
    (req: Request, res: Response, next: NextFunction) =>
      serviceAdapter.createService(req, res, next)
  );

  // route for get all services
  router.get(
    "/getServices",
    (req: Request, res: Response, next: NextFunction) =>
      serviceAdapter.getService(req, res, next)
  );

  router.put(
    "/editService",AuthMiddleware.protectAdmin,
    (req: Request, res: Response, next: NextFunction) =>
      serviceAdapter.editService(req, res, next)
  );  

  
export default router  
