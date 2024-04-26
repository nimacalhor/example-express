import type { Account } from "../types/account.types";
import { model, PaginateModel } from "mongoose";
import accountSchema from "./account.schema";
import paginate from "mongoose-paginate-v2";

accountSchema.plugin(paginate);

const Account = model<Account, PaginateModel<Account>>(
  "Account",
  accountSchema,
  "accounts"
);

export default Account;
