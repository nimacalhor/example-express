import { Request, Response, NextFunction } from "express";
import ValidationError from "../ValidationError";
import formatRes from "@global/helpers/formatResponse";

/**
 * میان‌افزار اکسپرس برای مدیریت خطاهای اعتبارسنجی.
 * این میان‌افزار باید بعد از سایر کنترلرها و میان‌افزارهای دیگر قرار گیرد.
 *
 * @function
 *
 * @param err - شیء خطا.
 * @param _ - شیء درخواست اکسپرس.
 * @param res - شیء پاسخ اکسپرس.
 * @param next- تابع فراخوانی بعدی اکسپرس.
 *
 * @example
 * // در یک روت یا میان‌افزار اکسپرس:
 * app.use(validationErrorMiddleware);
 */
const validationErrorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    // پردازش خطاهای اعتبارسنجی
    res
      .status(err.statusCode)
      .json(
        formatRes(
          "error",
          {
            errorMessage: err.message || "validation error",
            errorCode: err.errorCode,
          },
          { errors: err.errors }
        )
      );
  } else {
    // ارسال خطاهای دیگر به میان‌افزار بعدی
    next(err);
  }
};

export default validationErrorMiddleware;
