import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, MAX_PER_PAGE } from "../constants";
import ValidationError from "../ValidationError";

function getValidatePerPageMw(maxSize: number = MAX_PER_PAGE) {
  return function (req: Request, res: Response, next: NextFunction) {
    const perPage = Number(req.query.per_page);
    if (isNaN(perPage) || perPage <= 0 || perPage > maxSize)
      return next(
        new ValidationError(
          "Invalid per_page value. It should be a positive number less than or equal to " +
            maxSize,
          [],
          ERROR_CODES.INVALID_PER_PAGE_ERROR
        )
      );

    // If the validation passes, move to the next middleware or route handler
    next();
  };
}

export default getValidatePerPageMw;
