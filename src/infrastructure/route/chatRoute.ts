import express, { NextFunction, Request, Response } from "express";
import { chatAdapter } from "./injections/chatinjection";

const router = express.Router();

// route for create conversation
router.post(
  "/conversation",
  (req: Request, res: Response, next: NextFunction) =>
    chatAdapter.createConversation(req, res, next)
);

// route for create message
router.post("/message", (req: Request, res: Response, next: NextFunction) =>
  chatAdapter.createMessage(req, res, next)
);

// route for get all message
router.get("/message", (req: Request, res: Response, next: NextFunction) =>
  chatAdapter.getMessage(req, res, next)
);

// route for get all message
router.get("/getUnReadMessages", (req: Request, res: Response, next: NextFunction) =>
  chatAdapter.getUnReadMessages(req, res, next)
);

// route for get all message
router.patch("/viewMessages", (req: Request, res: Response, next: NextFunction) =>
  chatAdapter.viewMessages(req, res, next)
);

export default router;
