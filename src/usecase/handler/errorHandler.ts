import { Next, Req, Res } from "../../infrastructure/types/expressTypes";
import ErrorResponse from "./errorResponse";

const errorHandler = (err: any, req: Req, res: Res, next: Next) => {
  console.error(err);
  console.log('errorhandler');
  

  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }
  return res
    .status(500)
    .json({ success: false, status: 500, message: "Something went wrong" });
};

export default errorHandler;