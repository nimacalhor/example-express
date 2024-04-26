import type { Request, Response, NextFunction } from "express";
import { PATHS_WITHOUT_JSON_PARSING } from "../constants";
import multer from "multer";
import formatRes from "../helpers/formatResponse";
import { ERROR_CODES } from "@src/modules/errors/constants";

/**
 * این تابع یک میان‌افزار Express برای اعتبارسنجی و تجزیه‌وتحلیل داده‌های درخواست ایجاد می‌کند.
 * @param express - شیء Express برای استفاده از توابع تجزیه‌وتحلیل اعتبارسنجی JSON و فرم‌داده
 * @returns {Function} - میان‌افزار برای استفاده در اپلیکیشن Express
 */
function getValidateAndParseMiddleware(express: any) {
  return function validateAndParseMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // اطلاعات مسیر کنونی از PATHS_WITHOUT_JSON_PARSING گرفته می‌شود
    const routeInfo = PATHS_WITHOUT_JSON_PARSING.find(
      (route) =>
        req.method === route.method && req.originalUrl.startsWith(route.route)
    );

    if (routeInfo) {
      // اگر مسیر در PATHS_WITHOUT_JSON_PARSING باشد، از توابع تجزیه‌وتحلیل فرم‌داده استفاده می‌شود
      const formDataParser = multer().any();
      formDataParser(req, res, (err) => {
        if (err) {
          // اگر خطا در تجزیه‌وتحلیل فرم‌داده رخ دهد، پاسخ خطا ارسال می‌شود
          return res.status(400).json(
            formatRes("error", {
              errorMessage: "error parsing formData",
              errorCode: ERROR_CODES.BAD_FORM_DATA,
            })
          );
        }
        // اگر تجزیه‌وتحلیل فرم‌داده با موفقیت انجام شود، به میان‌افزار بعدی می‌رویم
        next();
      });
    } else {
      // اگر مسیر در PATHS_WITHOUT_JSON_PARSING نباشد، از تابع تجزیه‌وتحلیل JSON استفاده می‌شود
      express.json()(req, res, (err: any) => {
        if (err) {
          // اگر خطا در تجزیه‌وتحلیل JSON رخ دهد، پاسخ خطا ارسال می‌شود
          return res.status(400).json(
            formatRes("error", {
              errorMessage: "error parsing JSON",
              errorCode: ERROR_CODES.BAD_JSON_DATA,
            })
          );
        }
        // اگر تجزیه‌وتحلیل JSON با موفقیت انجام شود، به میان‌افزار بعدی می‌رویم
        next();
      });
    }
  };
}

export default getValidateAndParseMiddleware;
