import { Document, Model, ObjectId, PaginateModel } from "mongoose";
import { ERROR_CODES } from "./constants";

class NotFError extends Error {
  statusCode: number;
  errorCode: number;

  constructor(model: any, id: string | ObjectId) {
    const errorMessage = `${model.modelName} with id ${id} does not exist.`;
    super(errorMessage);
    this.name = "NotFError";
    this.statusCode = 404;
    this.errorCode = ERROR_CODES.DOCUMENT_NOT_FOUND;
  }
}

export default NotFError;
