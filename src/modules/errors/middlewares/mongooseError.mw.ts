import formatRes from "@global/helpers/formatResponse";
import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";
import { ERROR_CODES } from "../constants";

/**
 * میان‌افزار مدیریت خطاهای مربوط به Mongoose.
 *
 * @example
 * // در میان‌افزارهای خطا اکسپرس:
 * import mongooseErrorHandler from './middlewares/mongooseErrorHandler';
 *
 * app.use(mongooseErrorHandler);
 */
function mongooseErrorHandler(
  err: MongooseError,
  res: Response,
  next: NextFunction
) {
  // validation error
  if (err.name === "ValidationError") {
    res.status(422).json(
      formatRes(
        "error",
        {
          errorMessage: err.message,
          errorCode: ERROR_CODES.DOCUMENT_VALIDATION_ERROR,
        },
        { errors: (err as any).errors }
      )
    );
  }
  // duplicate key error
  else if ((err as any).code === 11000) {
    res.status(409).json(
      formatRes(
        "error",
        {
          errorMessage: "Duplicate key error",
          errorCode: ERROR_CODES.DOCUMENT_DUPLICATE_KEY_ERROR,
        },
        { err }
      )
    );
  }
  // invalid id error
  else if (
    err instanceof MongooseError.CastError &&
    err.message.includes("ObjectId")
  ) {
    res.status(400).json(
      formatRes("error", {
        errorMessage: "Invalid ObjectId format",
        errorCode: ERROR_CODES.INVALID_OBJECT_ID_ERROR,
      })
    );
  }
  //
  else next(err);
}

/**
 * میان‌افزار خطا برای افزودن مدیریت خطاهای Mongoose به مسیرها و کنترلرها.
 *
 * @example
 * // در فایل اصلی اکسپرس:
 * import mongooseErrorMiddleware from './middlewares/mongooseErrorHandler';
 *
 * app.use(mongooseErrorMiddleware);
 */
function mongooseErrorMiddleware(
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (
    err instanceof MongooseError ||
    (err.name && err.name.startsWith("Mongo"))
  ) {
    mongooseErrorHandler(err, res, next);
  } else {
    next(err);
  }
}

export default mongooseErrorMiddleware;
