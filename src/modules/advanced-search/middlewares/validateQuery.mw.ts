import { isArrayValid } from "@global/helpers/general.helper";
import ValidationError from "@src/modules/errors/ValidationError";
import createDefaultSetting from "@src/modules/setting/model/createDefaultSetting";
import Setting from "@src/modules/setting/model/setting.model";
import { Setting as SettingType } from "@src/modules/setting/types/setting.type";
import type { NextFunction, Request, Response } from "express";
import { SearchQuery } from "../types/advanced-search-types";

interface RType extends Request {
  body: {
    query: SearchQuery | null;
  };
}

function getQueryValidationMw(queryKey: "comment" | "media" | "profile") {
  let setting: SettingType;
  return async (req: RType, res: Response, next: NextFunction) => {
    if (!setting) {
      const settingFromDB = await Setting.findOne({});
      if (!settingFromDB) setting = await createDefaultSetting();
      else setting = settingFromDB;
    }
    const queryValue = extractQuery(req.originalUrl);
    const searchQuery = paramsToSearchItems(queryValue);

    if (!searchQuery) return next();
    if (!isArrayValid(searchQuery.items, true)) return next();
    for (const item of searchQuery.items) {
      // 2. Order must be a number
      if (item.order !== undefined && typeof item.order !== "number") {
        req.body.query = null;
        return next(new ValidationError("Order must be a number"));
      }

      // 4. Operator is enum: ["eq", "neq", "gt", "lt"]
      if (
        item.operator &&
        !["eq", "neq", "gt", "lt", "regex"].includes(item.operator)
      ) {
        req.body.query = null;
        return next(new ValidationError("Invalid operator"));
      }

      // 5. Query key is dynamic enum
      if (
        item.queryKey &&
        !setting.queryKeys[queryKey].map((q) => q.key).includes(item.queryKey)
      ) {
        req.body.query = null;
        return next(new ValidationError("Invalid query key"));
      }

      // 6. Query value is string
      if (
        item.queryValue !== undefined &&
        typeof item.queryValue !== "string"
      ) {
        req.body.query = null;
        return next(new ValidationError("Query value must be a string"));
      }
    }

    req.body.query = searchQuery;

    next();

    setting = (await Setting.findOne({})) as SettingType;
  };
}

export default getQueryValidationMw;

export function paramsToSearchItems(
  paramsString: string | null
): SearchQuery | null {
  if (!paramsString) return null;
  return JSON.parse(decodeURIComponent(paramsString));
}

function extractQuery(url: string): string | null {
  const queryStartIndex = url.indexOf("?");

  if (queryStartIndex !== -1) {
    const queryString = url.substring(queryStartIndex + 1);
    const queryParams = new URLSearchParams(queryString);
    const queryValue = queryParams.get("query");
    if (queryValue) {
      return decodeURIComponent(queryValue);
    }
  }

  return null;
}
