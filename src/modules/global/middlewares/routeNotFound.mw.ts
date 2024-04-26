import { Request, Response, NextFunction } from "express";
import formatRes from "../helpers/formatResponse";
import { ERROR_CODES } from "@src/modules/errors/constants";

/**
 * میان‌افزار برای مدیریت خطاهای 404 (پیدا نشد).
 *
 * @throws {Error} - یک خطا با پیام "پیدا نشد" را پرتاب می‌کند تا توسط میان‌افزار مدیریت خطاها بعدی گرفته شود.
 *
 * @example
 * // در یک برنامه اکسپرس:
 * import routeNotFound from './middlewares/routeNotFound';
 *
 * const app = express();
 * app.use(routeNotFound);
 */
function routeNotFound(req: Request, res: Response, next: NextFunction) {
  const err = new Error("Not Found");

  /**
   * تنظیم کد وضعیت HTTP به 404 (پیدا نشد).
   */
  res
    .status(404)
    .json(
      formatRes("error", {
        errorMessage: "not found",
        errorCode: ERROR_CODES.ROUTE_NOT_FOUND,
      })
    );

  // گذاشتن خطا در مسیر تا توسط میان‌افزار مدیریت خطاها بعدی گرفته شود.
  // next(err);
}

export default routeNotFound;
