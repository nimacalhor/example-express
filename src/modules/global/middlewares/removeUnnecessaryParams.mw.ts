import { NextFunction, Request, Response } from "express";

/**
 * یک middleware سفارشی برای حذف پارامترهای مغایر از درخواست.
 *
 * @param paramsToSave - آرایه ای از پارامترهای لازم برای حفظ.
 * @returns Middleware برای حذف پارامترهای مغایر از درخواست.
 *
 * @example
 * const necessaryParams = ['page', 'per_page'];
 * app.use(removeUnnecessaryParams(necessaryParams));
 *
 * app.get('/users', (req, res) => {
 *   // دسترسی به پارامترهای کوئری پاک شده
 *   const page = req.query.page;
 *   const perPage = req.query.per_page;
 *   // منطق شما با استفاده از page و perPage
 *   res.send(`Page: ${page}, Per Page: ${perPage}`);
 * });
 */
function removeUnnecessaryParams(paramsToSave: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const param in req.query) {
      if (!paramsToSave.includes(param)) {
        delete req.query[param];
      }
    }
    next();
  };
}

export default removeUnnecessaryParams