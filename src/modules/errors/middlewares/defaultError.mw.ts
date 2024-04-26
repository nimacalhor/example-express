import formatRes from "@global/helpers/formatResponse";
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES } from "../constants";

/**
 * میان‌افزار اکسپرس برای مدیریت خطاهای غیرمنتظره.
 * این میان‌افزار باید بعد از سایر کنترلرها و میان‌افزارهای دیگر قرار گیرد.
 *
 * @function
 *
 * @param err - شیء خطا.
 * @param _ - شیء درخواست اکسپرس.
 * @param res - شیء پاسخ اکسپرس.
 * @param __ - تابع فراخوانی بعدی اکسپرس.
 *
 * @example
 * // در یک روت یا میان‌افزار اکسپرس:
 * app.use(defaultErrorMiddleware);
 */
const defaultErrorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error("Unhandled Error:", { err });
  res
    .status(500)
    .json(
      formatRes(
        "error",
        {
          errorMessage: "internal server error",
          errorCode: ERROR_CODES.INTERNAL_ERROR,
        },
        { err }
      )
    );
};

export default defaultErrorMiddleware;
