import { Router } from "express";
import {
  createAccountController,
  validator as createAccountValidator,
} from "../controllers/createAccount.controller";
import { getAccountController } from "../controllers/getAccount.controller";
import {
  validator as getAccountListValidator,
  getAccountListController,
} from "../controllers/getAccountList.controller";
import {
  validator as updateAccountValidator,
  updateAccountController,
} from "../controllers/updateAccount.controller";
import { deleteAccountController } from "../controllers/deleteAccount.controller";

const router = Router();

router
  .route("/")
  .get(getAccountListValidator, getAccountListController)
  .post(createAccountValidator, createAccountController);
router
  .route("/:id")
  .get(getAccountController)
  .put(updateAccountValidator, updateAccountController)
  .delete(deleteAccountController);

export default router;
