import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ValidationError from "../ValidationError";

/**
 * یک میان‌افزار (middleware) برای اعتبارسنجی درخواست‌ها با استفاده از express-validator.
 *
 * @function
 *
 * @param {Request} req - شیء درخواست اکسپرس.
 * @param {Response} res - شیء پاسخ اکسپرس.
 * @param {NextFunction} next - تابع فراخوانی بعدی اکسپرس.
 *
 * @throws {ValidationError} اگر اعتبارسنجی ناموفق باشد، یک استثناء سفارشی از نوع ValidationError پرتاب می‌شود.
 *
 * @example
 * // در یک روت اکسپرس:
 * app.post('/register', [
 *   // قوانین اعتبارسنجی با استفاده از express-validator
 *   body('username').trim().isLength({ min: 5 }).withMessage('نام کاربری باید حداقل 5 کاراکتر باشد'),
 *   body('email').isEmail().withMessage('آدرس ایمیل نامعتبر است'),
 *   body('password').isLength({ min: 8 }).withMessage('رمز عبور باید حداقل 8 کاراکتر باشد'),
 * ], validateRequest, (req, res) => {
 *   // منطق روت در صورت اعتبارسنجی موفقیت‌آمیز
 *   res.send('عضویت با موفقیت انجام شد!');
 * });
 */
const validateRequest = (req: Request, _: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     
    return next(new ValidationError("Validation failed", errors.array()));
  }

  next();
};

export default validateRequest;
