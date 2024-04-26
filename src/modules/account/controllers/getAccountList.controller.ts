import Account from "../model/account.model";
import type { Request, Response } from "express";
import { D_PAGE, D_PER_PAGE } from "@global/constants";
import { convertToNumber } from "@global/helpers/general.helper";
import guardController from "@src/modules/errors/guardController";
import formatRes from "@src/modules/global/helpers/formatResponse";
import getPaginationValidationMws from "@global/middlewares/paginationValidation.mw";

interface RType extends Request {
  query: {
    per_page?: string;
    page?: string;
  };
}

async function getAccountList(req: RType, res: Response) {
  const { page = D_PAGE, per_page = D_PER_PAGE } = req.query;
  const paginateOptions = {
    page: convertToNumber(page),
    limit: convertToNumber(per_page),
  };

  const { docs, ...pagination } = await Account.paginate({}, paginateOptions);

  res.status(200).json(formatRes("success", docs, pagination));
}

export const validator = getPaginationValidationMws();
export const getAccountListController = guardController(getAccountList);
  