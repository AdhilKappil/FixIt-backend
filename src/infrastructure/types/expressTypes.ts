import { Request, Response, NextFunction } from "express";

// exporting type of req,res and next into the adapter layer
export type Req = Request;
export type Res = Response;
export type Next = NextFunction;
