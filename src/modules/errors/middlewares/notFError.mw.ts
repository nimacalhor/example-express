import formatRes from "@global/helpers/formatResponse";
import NotFError from "../NotFoundError";
import type { Request, Response, NextFunction } from "express";

// Error middleware
function notFErrorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof NotFError)) return next(err);

  res
    .status(err.statusCode)
    .json(
      formatRes("error", {
        errorMessage: err.message,
        errorCode: err.errorCode,
      })
    );
}

export default notFErrorMiddleware;
