import { Schema } from "mongoose";
import type { Account } from "../types/account.types";
import { STATUS } from "../constants";

const accountSchema = new Schema<Account>({
  accountId: { type: String, default: accountIdDefault },
  username: { type: String, required: true },
  password: { type: String, required: true },
  proxy: {
    type: String,
    required: true,
    match: [
      /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}$/,
      "Invalid proxy string. Please provide a valid proxy string.",
    ],
  },
  status: {
    type: String,
    enum: STATUS,
    default: STATUS[1],
    validate: {
      validator: function (value: string) {
        return STATUS.includes(value);
      },
      message:
        "Invalid status. Please provide a valid status from the allowed options: active, inactive, challenge, blocked.",
    },
  },
  requestCount: { type: Number, default: 0 },
  session: { type: Schema.Types.Mixed },
  email: { type: String, match: [/^\S+@\S+\.\S+$/, "Invalid email address"] },
  phone: {
    type: String,
    match: [
      /^\d+|\+$/,
      "Invalid phone number. Please provide only numeric values.",
    ],
  },
});
"accessible"

/**
 * یک میان‌افزار (Middleware) Mongoose برای ایجاد یک پیش‌فراخوانی (pre-hook) برای عملیات جستجو (find).
 * این میان‌افزار فیلد "session" را به صورت پیش‌فرض از نتیجهٔ جستجو حذف می‌کند.
 *
 * @param {Function} next - تابعی که باید فراخوانی شود تا عملیات پیش‌فراخوانی ادامه یابد.
 */
accountSchema.pre("find", function (next) {
  this.select("-session");
  next();
});

export default accountSchema;

function accountIdDefault() {
  return Math.floor(Math.random() * 1_000_000_000).toString();
}