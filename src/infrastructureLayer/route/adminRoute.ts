import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import { serviceAdapter } from "./injections/serviceInjection";
import AuthMiddleware from "../Middleware/authMiddleware";

const router = express.Router();

// roure for admin login
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  adminAdapter.loginAdmin(req, res, next)
);

// ============= User related routes ================= //

// roure for get user data
router.get(
  "/getUsers",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getUsers(req, res, next)
);

// roure for block user
router.patch(
  "/users/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);

// ============= Service related routes ================= //

// roure for create service
router.post(
  "/createService",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    serviceAdapter.createService(req, res, next)
);

// route for get all services
router.get("/getServices", (req: Request, res: Response, next: NextFunction) =>
  serviceAdapter.getService(req, res, next)
);

// route for edit all service details
router.put(
  "/editService",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    serviceAdapter.editService(req, res, next)
);

// ============= Worker related routes ================= //

// route for get all worker
router.get(
  "/getJoinRequests",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getJoinRequests(req, res, next)
);

// router for accept or reject worker
router.patch(
  "/worker/accept-rejectRequest",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.acceptOrRejectRequest(req, res, next)
);

// roure for block or un block worker
router.patch(
  "/worker/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.block_unBlockWorker(req, res, next)
);

export default router;
