import type { Request, Response, NextFunction } from "express";
import Account from "../model/account.model";
import NotFError from "@errors/NotFoundError";
import formatRes from "@global/helpers/formatResponse";
import validateRequest from "@errors/middlewares/validateRequest.mw";
import { body } from "express-validator";
import guardController from "@errors/guardController";

interface RType extends Request {
  params: {
    id: string;
  };
  body: {
    account: any;
  };
}

async function updateAccount(req: RType, res: Response) {
  const { id } = req.params;
  const updateData = req.body.account;
  const updatedAccount = await Account.findByIdAndUpdate(id, updateData, {
    runValidators: true,
    new: true,
  });
  if(!updatedAccount) throw new NotFError(Account, id)
  res.status(202).json(formatRes("success", { updatedAccount }));
}

export const validator = [body("account").isObject(), validateRequest]
export const updateAccountController = guardController(updateAccount);
