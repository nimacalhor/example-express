import { ERROR_CODES } from "./constants";

/**
 * یک استثناء سفارشی برای خطاهای اعتبارسنجی درخواست.
 *
 * @class
 * @extends {Error}
 *
 * @property {number} statusCode - کد وضعیت HTTP مرتبط با این نوع خطا (پیش‌فرض: 422 - Unprocessable Entity).
 * @property {any[]} errors - آرایه‌ای از اطلاعات خطاهای اعتبارسنجی.
 *
 * @param {string} message - پیام خطا.
 * @param {any[]} [errors=[]] - آرایه‌ای از اطلاعات خطاهای اعتبارسنجی (پیش‌فرض: []).
 *
 * @example
 * // در یک میان‌افزار یا کنترلر اکسپرس:
 * try {
 *   // کدی که باعث خطای اعتبارسنجی می‌شود
 *   throw new ValidationError('خطای اعتبارسنجی رخ داده است', [{ field: 'username', message: 'نام کاربری معتبر نیست' }]);
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('خطای اعتبارسنجی:', error);
 *     res.status(error.statusCode).json({ error: 'خطای اعتبارسنجی', details: error.errors });
 *   } else {
 *     // دیگر نوع‌های خطا را مدیریت کنید
 *     console.error('خطای دیگر:', error);
 *     res.status(500).json({ error: 'خطای داخلی سرور' });
 *   }
 * }
 */
class ValidationError extends Error {
  statusCode: number;
  errors: any[];
  errorCode: number;

  constructor(
    message: string,
    errors: any[] = [],
    errorCode: number = ERROR_CODES.REQUEST_BODY_VALIDATION_ERROR
  ) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 422;
    this.errors = errors;
    this.errorCode = errorCode;
  }
}

export default ValidationError;
