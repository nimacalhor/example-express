import Account from "../model/account.model";
import NotFError from "@errors/NotFoundError";
import type { Request, Response } from "express";
import guardController from "@errors/guardController";
import formatRes from "@global/helpers/formatResponse";

interface RType extends Request {
  params: {
    id: string;
  };
}

async function getAccount(req: RType, res: Response) {
  const { id } = req.params;
  const account = await Account.findById(id);
  if (!account) throw new NotFError(Account, id);
  res.status(200).json(formatRes("success", { account }));
}

export const getAccountController = guardController(getAccount);
