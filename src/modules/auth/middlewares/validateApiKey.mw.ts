import { ERROR_CODES } from "@src/modules/errors/constants";
import formatRes from "@src/modules/global/helpers/formatResponse";
import type { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY;

function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api-key"];

  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json(
      formatRes("error", {
        errorMessage: "App Unauthorized",
        errorCode: ERROR_CODES.AUTH_API_KEY_ERROR,
      })
    );
  }
}

export default validateApiKey