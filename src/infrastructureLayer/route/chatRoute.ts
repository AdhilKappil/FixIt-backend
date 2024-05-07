import express, { NextFunction, Request, Response } from "express";
import { chatAdapter } from "./injections/chatinjection";

const router = express.Router();

// route for create conversation
router.post(
    "/conversation",
    (req: Request, res: Response, next: NextFunction) =>
      chatAdapter.createConversation(req, res, next)
  );


export default router  