import { query } from "express-validator";
import validateRequest from "@errors/middlewares/validateRequest.mw";
import removeUnnecessaryParams from "./removeUnnecessaryParams.mw";
import { NextFunction, Request, Response } from "express";

/**
 * تابعی که middleware های اعتبارسنجی برای پارامترهای صفحه‌بندی ایجاد می‌کند.
 *
 * @returns آرایه‌ای از middleware ها برای اعتبارسنجی پارامترهای صفحه‌بندی.
 *
 * @example
 * const paginationValidationMiddlewares = getPaginationValidationMws();
 * app.get('/api/documents', paginationValidationMiddlewares, (req, res) => {
 *   // منطق مسیر
 * });
 */
function getPaginationValidationMws() {
  return [
    query("page").optional().isInt().withMessage("page must be a number"),
    query("per_page")
      .optional()
      .isInt()
      .withMessage("per_page must be a number"),
    removeUnnecessaryParams(["page", "per_page"]),
    validateRequest,
  ];
}

export default getPaginationValidationMws;
