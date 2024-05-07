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
router.post(
    "/message",
    (req: Request, res: Response, next: NextFunction) =>
      chatAdapter.(req, res, next)
  );

// router.get(
//     "/conversation",
//     (req: Request, res: Response, next: NextFunction) =>
//       chatAdapter.createConversation(req, res, next)
//   );


export default router  