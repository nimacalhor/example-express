import { FilterQuery } from "mongoose";
import { SearchItem, SearchQuery } from "../types/advanced-search-types";
import type { Request, Response, NextFunction } from "express";

type MongoDBQuery = {
  $or?: Record<
    string,
    | { $eq: string | number }
    | { $ne: string | number }
    | { $gt: string | number }
    | { $lt: string | number }
    | { $regex: string | number }
  >[];
  $and?: Record<
    string,
    | { $eq: string | number }
    | { $ne: string | number }
    | { $gt: string | number }
    | { $lt: string | number }
    | { $regex: string | number }
  >[];
};

function createQuery(req: Request, res: Response, next: NextFunction) {
  try {
    // Get searchItems from req.body.query
    const searchItems: SearchQuery = req.body.query;
    // Validate searchItems (You can add your own validation logic here)
     
    if (!searchItems) return next();
    // Create MongoDB query
    const mongoDBQuery = createMongoDBQuery2(searchItems);
     
    // Add the created MongoDB query to req.body.createdMongoDBQuery
    req.body.query = mongoDBQuery;
     

    // Move to the next middleware or route
    next();
  } catch (error) {
    // Handle any errors during the process
    next(error);
  }
}

export default createQuery;

function createMongoDBQuery2(input: SearchQuery): MongoDBQuery {
  const result: MongoDBQuery = {};

  const queryArray: Record<
    string,
    | { $eq: string | number }
    | { $ne: string | number }
    | { $gt: string | number }
    | { $lt: string | number }
    | { $regex: string | number }
  >[] = [];

  input.items.forEach((item) => {
    const condition = {};
    (condition as any)[item.queryKey] = getOperatorQuery(
      item.operator,
      item.queryValue,
      item.queryType
    );
    queryArray.push(condition);
  });

  if (input.condition === "OR") {
    (result as any).$or = queryArray;
  } else if (input.condition === "AND") {
    result.$and = queryArray;
  }

  return result;
}

function getOperatorQuery(operator: string, value: string, type: string) {
   
  switch (operator) {
    case "eq":
      return { $eq: convertValue(value, type) };
    case "neq":
      return { $ne: convertValue(value, type) };
    case "gt":
      return { $gt: convertValue(value, type) };
    case "lt":
      return { $lt: convertValue(value, type) };
    case "regex":
      return { $regex: new RegExp(value, "im") };
    default:
      return { $regex: convertValue(value, "string") };
  }
}

function convertValue(value: string, type: string) {
  switch (type) {
    case "string":
      return value;
    case "number": {
      try {
        const nValue = parseInt(value);
        return nValue;
      } catch (error) {
        return value;
      }
    }
    default:
      return value;
  }
}
