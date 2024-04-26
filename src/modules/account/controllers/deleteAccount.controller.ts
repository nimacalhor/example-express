import type { Request, Response, NextFunction } from "express";
import Account from "../model/account.model";
import NotFError from "@errors/NotFoundError";
import formatRes from "@global/helpers/formatResponse";
import guardController from "@errors/guardController";

interface RTtype extends Request {
  params: {
    id: string;
  };
}

async function deleteAccount(req: RTtype, res: Response) {
  const { id } = req.params;
  const deletedAccount = await Account.findByIdAndDelete(id);
  if (!deletedAccount) throw new NotFError(Account, id);
  res.status(200).json(formatRes("success", { deletedAccount }));
}

export const deleteAccountController = guardController(deleteAccount);
