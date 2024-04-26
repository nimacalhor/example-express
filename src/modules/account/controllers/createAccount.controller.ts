import validateRequest from "@errors/middlewares/validateRequest.mw";
import guardController from "@src/modules/errors/guardController";
import formatRes from "@src/modules/global/helpers/formatResponse";
import type { Request, Response } from "express";
import { body } from "express-validator";
import Account from "../model/account.model";
import { Account as AccountType } from "../types/account.types";

interface RType extends Request {
  body: {
    account: AccountType;
  };
}

async function createAccount(req: RType, res: Response) {
  const { account } = req.body;
  const newAccount = new Account(account);
  await newAccount.save();
  res.status(201).json(formatRes("success", { newAccount }));
}

export const validator = [body("account").isObject(), validateRequest];
export const createAccountController = guardController(createAccount);
